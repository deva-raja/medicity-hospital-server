const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
  const admin = req.body.admin;
  const doctor = req.body.doctor;
  if (admin) {
    jwt.verify(admin, 'medicity', (err, decodedToken) => {
      if (err) {
        return res.json({ page: 'login' });
      }
       return res.json({ page: 'admin' });
    });
  } else if (doctor) {
    jwt.verify(doctor, 'medicity', (err, decodedToken) => {
      if (err) {
        return res.json({ page: 'login' });
      }
      return res.json({ page: 'doctor' });
    });
  } else {
    res.json({ page: 'login' });
  }
};

module.exports = {
  authMiddleWare,
};
