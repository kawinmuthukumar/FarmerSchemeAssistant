const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 18 },
  state: { type: String, required: true },
  district: { type: String, default: '' },
  land: { type: Number, required: true, min: 0 },
  crop: { type: String, required: true },
  income: { type: Number, required: true, min: 0 },
  category: { type: String, default: 'General', enum: ['General', 'OBC', 'SC', 'ST'] },
  matchedSchemes: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
