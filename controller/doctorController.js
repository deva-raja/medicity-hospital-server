const Doctor = require('../models/Doctors');
const jwt = require('jsonwebtoken');

const handleError = (error) => {
  console.log(error.message, error.code);
  const errors = { email: '', password: '' };

  if (error.message === 'incorrect email') {
    errors.email = 'email is not registered';
  }

  if (error.message === 'incorrect password') {
    errors.password = 'password is incorrect';
  }

  if (error.code === 11000) {
    errors.email = 'email already taken';
    return errors;
  }

  if (error.message.includes('Doctor validation failed')) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'medicity', {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  return res.status(201).json({ doctor: 'signup' });
};

const login_get = (req, res) => {
  return res.status(201).json({ doctor: 'login' });
};

const show_get = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    res.status(201).json({ doctor });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const create_post = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ doctor: doctor._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);

    const token = createToken(doctor._id);
    res.cookie('doctor', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ doctor: doctor._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};

const Doctor = require('../models/Doctor');

const create_post = async (req, res) => {
  try {
    const message = await Doctor.create(req.body);
    res.status(201).json({ message });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const destroy_delete = async (req, res) => {
  try {
    const message = await Doctor.deleteOne({ id: req.body.id });
    res.status(201).json(message);
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

module.exports = {
  login_get,
  create_get,
  show_get,
  destroy_delete,
  logout_get,
};
