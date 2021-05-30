const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      maxlength: [2, 'Too old'],
    },
    sex: {
      type: String,
      required: [true, 'Sex is required'],
    },
    phoneNumber: {
      type: String,
    },
    doctor_id: {
      type: String,
      required: [true, 'Doctor_id is required'],
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
