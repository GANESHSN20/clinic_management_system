const PrescriptionModel = require("../model/prescription-model");

const PrescriptionDao = {
  isPrescriptionExist: (payload, startOfDay, endOfDay) => {
    return PrescriptionModel.findOne({
      patientId: payload.patientId,
      doctorId: payload.doctorId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
  },

  add: (payload) => {
    return PrescriptionModel({
      doctorId: payload.doctorId,
      patientId: payload.patientId,
      appointmentId: payload.appointmentId,
      diagnosis: payload.diagnosis,
      medicines: payload.medicines,
      investigations: payload.investigations,
      followUpDate: payload.followUpDate,
      notes: payload.notes,
    }).save();
  },

  list: (patientId) => {
    return PrescriptionModel.find({ patientId: patientId });
  },

  update: (payload, patientId) => {
    return PrescriptionModel.updateOne(
      { patientId: patientId },
      { $set: payload }
    );
  },
};

module.exports = PrescriptionDao;
