const { isEmail } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DoctorSchema = mongoose.Schema({
  img: {
    type: Buffer,
  },
  name: {
    type: String,
  },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
