const mongoose = require("mongoose");
const { Schema } = mongoose;
const Config= require("../utils/config")

const AppointmentSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  slotParentId: {
    type: Schema.Types.ObjectId,
    ref: "slots",
    required: true,
  },

  slotId: {
    type: Schema.Types.ObjectId,
    ref: "slot",
  },

  date: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: Config.appointmentStatus,
    default: "BOOKED",
  },

  reason: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointments", AppointmentSchema);
