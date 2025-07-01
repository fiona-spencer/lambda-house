require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ API routes
app.get('/api/test', (req, res) => {
  res.send('🚀 API is running from /api/test');
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all for React frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// Server Start
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
