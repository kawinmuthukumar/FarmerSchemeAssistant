require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./models/User');
const Farmer = require('./models/Farmer');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5500';

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'farmer-scheme-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax',
    secure: false // set to true in production with HTTPS
  }
}));

// ── MONGODB CONNECTION ───────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/farmer_scheme_assistant';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB — farmer_scheme_assistant'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// ── AUTH MIDDLEWARE ───────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ success: false, error: 'Not logged in' });
}

// ── AUTH ROUTES ──────────────────────────────────────────────────────────────

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone: phone || '' });
    const saved = await user.save();

    req.session.userId = saved._id;
    req.session.userName = saved.name;

    console.log(`📝 Registered: ${saved.name} (${saved.email})`);
    res.status(201).json({ success: true, user: { id: saved._id, name: saved.name, email: saved.email } });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.userName = user.name;

    console.log(`🔑 Login: ${user.name} (${user.email})`);
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Logout
app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Check session
app.get('/api/me', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ success: true, user: { id: req.session.userId, name: req.session.userName } });
  } else {
    res.status(401).json({ success: false });
  }
});

// ── FARMER ROUTES ────────────────────────────────────────────────────────────

// Save farmer profile
app.post('/api/farmers', requireAuth, async (req, res) => {
  try {
    const { name, age, state, district, land, crop, income, category, matchedSchemes } = req.body;

    const farmer = new Farmer({
      userId: req.session.userId,
      name, age, state,
      district: district || '',
      land, crop, income,
      category: category || 'General',
      matchedSchemes: matchedSchemes || []
    });

    const saved = await farmer.save();
    console.log(`📝 Saved farmer: ${saved.name} (ID: ${saved._id})`);
    res.status(201).json({ success: true, farmer: saved });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all farmers (for current user)
app.get('/api/farmers', requireAuth, async (req, res) => {
  try {
    const farmers = await Farmer.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: farmers.length, farmers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single farmer
app.get('/api/farmers/:id', requireAuth, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ success: false, error: 'Farmer not found' });
    res.json({ success: true, farmer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Farmer Scheme Assistant API is running' });
});

// ── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend API running at http://localhost:${PORT}`);
  console.log(`🌐 Accepting requests from: ${FRONTEND_URL}`);
});
