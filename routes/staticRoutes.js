const express = require('express');
const path = require('path');
const router = express.Router();
router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'user.html'));
});
router.get('/Already_logged_in', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/errors', '404a.html'));
});
router.get('/noaccess', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/errors', '404.html'));
});
router.post('/firebase', (req, res) => {
    const firebaseConfig = {
        apiKey: process.env.APP_FIREBASE_API_KEY,
        authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.APP_FIREBASE_APP_ID,
        measurementId: process.env.APP_FIREBASE_MEASUREMENT_ID
    };

    // Send the firebaseConfig back in the response
    res.json(firebaseConfig);
});

module.exports = router;
