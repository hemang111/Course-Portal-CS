const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User.js'); // Import User model
const router = express.Router();
const db = mongoose.connection;
const dbcollection = db.collection('Webinars');

// POST: Create or register a new user
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body.Data;
    console.log(email);
    const existingUser = await User.findOne({ email, name });
    if (existingUser) {
      return res.status(201).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, name });
    const webinars = await dbcollection.find({}).toArray();
    const webinarTitles = webinars.map(webinar => webinar.Webinar);
    newUser.availablecourses = webinarTitles;
    await newUser.save();
    return res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (err) {
    console.error('Error adding user:', err);
    return res.status(400).json({ message: 'Error adding user' });
  }
});
module.exports = router;
