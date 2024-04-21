const express = require('express');

const router = express.Router();

// Route to open home.ejs
router.get('/', (req, res) => {
    res.render('home');
});

// Route to open add-patient.ejs
router.get('/add-patient', (req, res) => {
    res.render('add-patient');
});

// Route to open patients.ejs
router.get('/viewpatients', (req, res) => {
    res.render('patients');
});

// Route to open update-patient.ejs
router.get('/update-patient', (req, res) => {
    res.render('update-patient');
});

module.exports = router;