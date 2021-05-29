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
  return jwt.sign({ id }, process.env.jwtKey, {
    expiresIn: maxAge,
  });
};

const show_post = async (req, res) => {
  const { speciality, name } = req.body;
  try {
    if (speciality === '') {
      const doctor = await Doctor.find();
      return res.status(201).json({ doctor });
    } else {
      let queryName = `.*${name}.*`;
      let regex = new RegExp(queryName, 'i');
      const doctor = await Doctor.find({ name: regex, speciality: speciality });
      return res.status(201).json({ doctor });
    }
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
    res.status(201).json({ doctor: doctor._id, token });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

// admin part
const create_post = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ doctor: doctor._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const destroy_delete = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    if (doctor) {
      await Doctor.deleteOne({ _id: doctor._id });
      res.status(201).json({ doctor: doctor._id });
    }
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

module.exports = {
  login_post,
  create_post,
  show_post,
  destroy_delete,
};
