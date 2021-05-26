const User = require('../models/User');
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

  if (error.message.includes('User validation failed')) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'vinu devaraj', {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  return res.render('signup');
};

const login_get = (req, res) => {
  return res.render('login');
};

const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
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

