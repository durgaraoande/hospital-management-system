const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  doctor: { 
    type: String, 
    enum: ['Dr. Smith', 'Dr. Johnson', 'Dr. Brown','Other'],
     required: true
     },
  contact: {
    type: String,
    required: true
  },
  viscount:{
    type:Number
  },
  opcount:{
    type: Number,
    required:true
  },
  amount:{
    type:Number
  },
  date: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
  // Add more fields as needed
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
