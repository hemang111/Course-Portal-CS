const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Database connection
mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/functions', express.static(path.join(__dirname, 'functions')));
app.use('/errors', express.static(path.join(__dirname, 'errors')));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Routes
const userRoutes = require('./routes/userRoutes');
const webinarRoutes = require('./routes/webinarRoutes');
const staticRoutes = require('./routes/staticRoutes');

app.use('/api/users', userRoutes); 
app.use('/api/webinars', webinarRoutes); 
app.use(staticRoutes); 

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
