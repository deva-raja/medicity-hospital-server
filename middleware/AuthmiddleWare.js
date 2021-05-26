const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'vinu devaraj', (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      }
      next();
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'vinu devaraj', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  authMiddleWare,
  checkUser,
};
