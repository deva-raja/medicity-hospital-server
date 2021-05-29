const { isEmail } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
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
});

adminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email: email });
  if (admin) {
    let correctPassword = await bcrypt.compare(password, admin.password);
    if (correctPassword) {
      return admin;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
