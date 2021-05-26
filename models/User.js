const { isEmail } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
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
    minlength: [4, 'Should be atleast 4 characters'],
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    let correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
