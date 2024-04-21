const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  // Add more fields as needed
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
