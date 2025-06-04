const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://to-do-list-five-delta-65.vercel.app'|| 'http://localhost:3000', // Adjust the origin as needed
}));
// Connect to MongoDB
const mongoURI = "mongodb+srv://arunmundakkal003:9xbkPqFf7LrfEI3F@cluster0.mfjj2km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the da backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
mongoose.set('debug', true);

