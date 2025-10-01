const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/instantfixer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to InstantFixer API' });
});

// User routes
app.use('/api/users', require('./routes/users'));
app.use('/api/helpers', require('./routes/helpers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/services', require('./routes/services'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;