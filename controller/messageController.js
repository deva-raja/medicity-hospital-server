const Message = require('../models/Message');

const handleError = (error) => {
  console.log(error.message, error.code);
  const errors = { errorMsg: '' };

  if (error.code === 11000) {
    errors.errorMsg = 'Already sent a msg from this email!';
    return errors;
  }
  errors.errorMsg = 'Something went wrong';
  return errors;
};

const show_get = async (req, res) => {
  try {
    const message = await Message.find().sort({ createdAt: -1 });
    res.status(201).json({ message });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const create_post = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ message });
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

const destroy_delete = async (req, res) => {
  try {
    const message = await Message.deleteOne({ id: req.body.id });
    res.status(201).json(message);
  } catch (error) {
    const errors = handleError(error);
    res.status(200).json({ errors });
  }
};

module.exports = {
  show_get,
  create_post,
  destroy_delete,
};
