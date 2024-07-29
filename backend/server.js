const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const mongoURI = 'mongodb+srv://rkalkumbe007:7767091763@cluster0.14foxzr.mongodb.net/Movie_Ticket_Booking?retryWrites=true&w=majority&appName=Cluster0';  // Replace with your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
