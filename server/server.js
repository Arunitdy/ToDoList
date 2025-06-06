const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
const mongoURI = "mongodb+srv://arunmundakkal003:9xbkPqFf7LrfEI3F@cluster0.mfjj2km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));
mongoose.set('debug', true);

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send("Welcome to backend"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
