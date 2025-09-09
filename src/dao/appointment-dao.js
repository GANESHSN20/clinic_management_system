const AppointmentModel = require("../model/appointment-model");
const SlotModel = require("../model/slot-model");

const AppointmentDao = {
  isSlotExist: (payload) => {
    return AppointmentModel.findOne({ slotId: payload.slotId }).populate(
      "slotParentId"
    );
  },

  book: (payload) => {
    console.log({ payload });

    return AppointmentModel({
      doctorId: payload.doctorId,
      patientId: payload.patientId,
      slotParentId: payload.slotParentId,
      slotId: payload.slotId,
      date: payload.date,
      reason: payload.reason,
    }).save();
  },

  update: (result) => {
    return SlotModel.updateOne(
      { _id: result.slotParentId, "slots._id": result.slotId },
      { $set: { "slots.$.status": true } }
    );
  },

  list: () => {
    return AppointmentModel.find({}, { reason: 1, date: 1, status: 1 })
      .populate({
        path: "doctorId",
        select: { firstName: 1, lastName: 1, specialzation: 1 },
      })
      .populate({
        path: "patientId",
        select: { firstName: 1, lastName: 1 },
      })
      .populate({
        path: "slotParentId",
        select: { slots: 1 },
      });
  },
};

module.exports = AppointmentDao;
