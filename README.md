# 🌾 Farmer Scheme Assistant

A web application to help Indian farmers discover and apply for government schemes, subsidies, and welfare programs. Supports **Tamil** and **English** with voice chatbot features.

## Features

- 🔍 **Scheme Matching** — Enter your profile details and get personalized government scheme recommendations
- 🤖 **AI Chatbot** — Ask about schemes, documents, and eligibility in Tamil or English
- 🗣️ **Voice Support** — Speech-to-text and text-to-speech in both languages
- 🔐 **User Authentication** — Register/login with session-based auth
- 📱 **Responsive Design** — Works on desktop and mobile

## Project Structure

```
├── backend/          ← Express API server
│   ├── server.js     ← API routes (auth, farmers)
│   ├── models/       ← Mongoose models (User, Farmer)
│   ├── .env          ← Environment config (not in repo)
│   └── package.json
│
└── frontend/         ← Static frontend
    ├── login.html    ← Login/Register page
    ├── profile.html  ← Farmer profile form
    ├── schemes.html  ← Matched schemes display
    ├── chatbot.html  ← AI chatbot interface
    ├── app.js        ← Client-side logic
    ├── data.js       ← Scheme data & FAQ
    ├── styles.css    ← All styles
    └── package.json
```

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, bcryptjs
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Auth:** express-session with cookie-based sessions

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally

### 1. Clone the repo
```bash
git clone https://github.com/kawinmuthukumar/FarmerSchemeAssistant.git
cd FarmerSchemeAssistant
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/farmer_scheme_assistant
SESSION_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5500
```

Start the backend:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm start
```

### 4. Open in browser
Navigate to **http://localhost:5500**

## Deployment

| Component | Deploy To | Config |
|-----------|-----------|--------|
| Backend | Render / Railway / Heroku | Set env vars in dashboard |
| Frontend | Vercel / Netlify / GitHub Pages | Update `API_BASE` in `app.js` and `login.html` |

## License

ISC — For Educational / Project Demonstration Purposes

---

Built with ❤️ for Indian Farmers 🇮🇳
