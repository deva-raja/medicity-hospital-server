const Admin = require('../models/Admin');
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

  if (error.message.includes('Admin validation failed')) {
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

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);

    const token = await createToken(admin._id);
    res.status(201).json({ admin: admin._id, token });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

module.exports = {
  login_post,
};
