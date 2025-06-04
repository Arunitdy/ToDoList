const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


mongoose.connect("mongodb://arunmundakkal003:u4NgM8YsoafWMfcO@cluster0-shard-00-00.xxxxx.mongodb.net:27017,cluster0-shard-00-01.xxxxx.mongodb.net:27017,cluster0-shard-00-02.xxxxx.mongodb.net:27017/sample_mflix?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority")

.then(() => {
    console.log("✅ Connected to MongoDB successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  });
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add other CRUD routes...

// For Vercel deployment
module.exports = app;
