const SlotModel = require("../model/slot-model");

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
};

module.exports = SlotDao;
