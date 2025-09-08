const SlotModel = require("../model/slot-model");
const { list } = require("./user-dao");

const SlotDao = {
  create: (payload) => {
    console.log({ payload });

    return SlotModel({
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      duration: payload.duration,
      slots: payload.slots,
      doctorId: payload.doctorId,
    }).save();
  },

  list: (date) => {
	console.log(date);
    return SlotModel.find({ date: { $gte: date } }, {date:1,slots:1});
  },
};

module.exports = SlotDao;
