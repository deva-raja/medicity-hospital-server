const { isEmail } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Email is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    validate: [isEmail, 'Should be a vaild email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [2, 'Should be atleast 2 characters'],
  },
  speciality: {
    type: String,
    required: [true, 'Speciality is required'],
  },
  phoneNumber: {
    type: String,
  },
});

doctorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

doctorSchema.statics.login = async function (email, password) {
  const doctor = await this.findOne({ email: email });
  if (doctor) {
    let correctPassword = await bcrypt.compare(password, doctor.password);
    if (correctPassword) {
      return doctor;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
