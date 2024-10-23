const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = mongoose.connection;
const User = require('../models/User.js'); // Import User model
const dbcollection = db.collection('Webinars');
let datam = {}
let datar = {}
// Helper functions for fetching webinar data
async function data(dataas, datam) {
  const collection = db.collection('Webinars');
  const documents = await collection.find({ Webinar: dataas }).toArray();
  if (documents.length > 0) {
    datam[documents[0].Webinar] = {
      Title: documents[0].Webinar,
      Mentor: documents[0].Mentor,
      TA: documents[0].Teaching_Assistant,
      Date: documents[0].Date_of_reg,
      Time: documents[0].Time_of_reg,
      type: documents[0].Type,
      glink: documents[0].glink
    };
  }
}

async function dataa(dataas, datar) {
  const collection = db.collection('Webinars');
  const documents = await collection.find({ Webinar: dataas }).toArray();
  if (documents.length > 0) {
    datar[documents[0].Webinar] = {
      Title: documents[0].Webinar,
      Mentor: documents[0].Mentor,
      TA: documents[0].Teaching_Assistant,
      Date: documents[0].Date_of_reg,
      Time: documents[0].Time_of_reg,
      type: documents[0].Type,
      status: documents[0].Status,
      glink: documents[0].glink,
      Wt: documents[0].Webinar_time,
      Wd: documents[0].Webinar_date,
      d: documents[0].Duration,
      mlink: documents[0].mlink,
      clink: documents[0].clink
    };
  }
}

// POST: Fetch available webinars for a user
router.post('/availablewebinars', async (req, res) => {
  datam = {};
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const availableCourses = existingUser.availablecourses;
      await Promise.all(availableCourses.map(async (element) => {
        await data(element, datam);
      }));
      res.status(200).json({ message: 'User data fetched', courses: datam });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// POST: Register a course
router.post('/registercourse', async (req, res) => {
  const { mail, course } = req.body;
  const collection = db.collection('data');
  try {
    await collection.updateOne({ email: mail }, { $pull: { availablecourses: course } });
    await collection.updateOne({ email: mail }, { $addToSet: { registeredcourses: course } });
    await dbcollection.updateOne({ Webinar: course }, { $addToSet: { Registered: mail } });
    res.status(200).json({ message: 'Registered' });
  } catch (err) {
    console.error('Error pushing element:', err);
    res.status(404).json({ message: 'Data cannot be pushed' });
  }
});
router.post('/registeredcourses', async(req,res)=>{
    datar = {}
    try {
      const {email} = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const registeredCourses = existingUser.registeredcourses;
        console.log(registeredCourses);
        await Promise.all( registeredCourses.map(async element =>{
         await dataa(element,datar)
      }));
       res.status(200).json({ message: 'User data fetched', courses: datar }); // Use 'courses' instead of 'user' for clarity
      } else {
        res.status(404).json({ message: 'User not found' }); // Informative message for missing user
      }
  } catch(err){
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
  })
module.exports = router;
