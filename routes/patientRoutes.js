const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// Create a new patient
router.post('/patients', async (req, res) => {
  try {
    // Check if a patient with the provided name already exists
    const existingPatient = await Patient.findOne({ name: req.body.name.toLowerCase() });
    if (existingPatient) {
      res.render('home', { message: 'A patient with this name already exists' });
    } else {
      const newPatient = await Patient.create(req.body);
      res.render('home', { message: 'Patient created successfully' }); // Render home.ejs
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all patients or a single patient by name
router.get('/patients', async (req, res) => {
  try {
    if (req.query.name) {
      // A name is provided in the query string, find a patient by name
      const patient = await Patient.findOne({ name: req.query.name.toLowerCase() });
      if (patient) {
        res.render('patients', { patients: [patient] }); // Render patients.ejs with the patient's data
      } else {
        res.render('home', { error: 'No patient exists' });
      }
    }
      else if(req.query.date){
        const date = new Date(req.query.date);
        const patients = await Patient.find({ date: date });
        if (patients.length > 0) {
          res.render('patients', { patients: patients }); // Render patients.ejs with the patients' data
        } else {
          res.render('home', { error: 'No patient exists' });
        }
    }
    else {
      // No name is provided in the query string, return all patients
      const patients = await Patient.find();
      res.render('patients', { patients: patients }); // Render patients.ejs with all patients' data
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to open update-patient.ejs
router.get('/update-patient/:name', async (req, res) => {
  try {
    const patient = await Patient.findOne({ name: req.params.name });
    if (patient) {
      var date = new Date(patient.date);
      var formattedDate = date.getFullYear() + '-' +
                          ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                          ('0' + date.getDate()).slice(-2);

      // Render the EJS template with the patient's data
      res.render('update-patient', { patient: patient, formattedDate: formattedDate });
      // res.render('update-patient', { patient: patient });
    } else {
      res.status(404).send('Patient not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a patient by name
router.patch('/patients/:name', async (req, res) => {
  try {
    const updatedPatient = await Patient.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
    if (updatedPatient) {
      res.status(200).json(updatedPatient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a patient by name
router.delete('/patients/:name', async (req, res) => {
  try {
    await Patient.findOneAndDelete({ name: req.params.name });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
