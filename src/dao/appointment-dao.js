const AppointmentModel = require("../model/appointment-model");
const SlotModel = require("../model/slot-model");

const AppointmentDao = {
  isAppointmentExist: (payload) => {
    return AppointmentModel.findOne({
      "slots.slot": payload.slots.slot,
      date: {
        $eq: payload.date,
      },
    });
  },

  book: (payload) => {
    console.log({ payload });

    return AppointmentModel({
      doctorId: payload.doctorId,
      patientId: payload.patientId,
      slots: payload.slots,
      date: payload.date,
      reason: payload.reason,
      prescription: payload.prescription,
      consultationFees: payload.consultationFees,
    }).save();
  },

  list: (date) => {
    return AppointmentModel.find({
      date: {
        $gte: date,
      },
    })
      .populate({
        path: "doctorId",
        select: { firstName: 1, lastName: 1, specialization: 1 },
      })
      .populate({
        path: "patientId",
        select: { firstName: 1, lastName: 1, gender: 1, dateOfBirth: 1 },
      });
  },

  update: (payload, appointmentId) => {
    return AppointmentModel.updateOne(
      { _id: appointmentId },
      { $set: payload }
    );
  },

  detail: (id) => {
    return AppointmentModel.findOne({
      _id: id,
    })
      .populate({
        path: "doctorId",
        select: { password: 0, userName: 0 },
      })
      .populate({
        path: "patientId",
        select: { email: 0, password: 0, userName: 0 },
      });
  },

};

module.exports = AppointmentDao;
