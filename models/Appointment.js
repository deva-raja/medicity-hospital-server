const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    age: {
      type: String,
      required: [true, 'Age is required'],
    },
    sex: {
      type: String,
      required: [true, 'Sex is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    conditions: {
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
