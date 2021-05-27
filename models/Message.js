const { isEmail } = require('validator');
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    validate: [isEmail, 'Should be a vaild email'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [2, 'Should be atleast 2 characters'],
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
