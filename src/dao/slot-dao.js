const SlotModel = require("../model/slot-model");

const SlotDao = {
  create: (payload) => {
    return SlotModel({
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      duration: payload.duration,
      slots: payload.slots,
    }).save();
  },
};

module.exports = SlotDao;
