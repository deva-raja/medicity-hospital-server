const Appointment = require('../models/Appointment');

const handleError = (error) => {
  console.log(error.appointment, error.code);
  const errors = { errorMsg: '' };
  //   need doctor_id also
  errors.errorMsg = 'Something went wrong';
  return errors;
};

const show_post = async (req, res) => {
  const { doctor_id } = req.body;
  try {
    const appointment = await Appointment.find({ doctor_id: doctor_id }).sort({ createdAt: -1 });
    res.status(201).json({ appointment });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const create_post = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ appointment });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const destroy_delete = async (req, res) => {
  try {
    const appointment = await Appointment.deleteOne({ id: req.body.id });
    res.status(201).json(appointment);
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

module.exports = {
  show_post,
  create_post,
  destroy_delete,
};
