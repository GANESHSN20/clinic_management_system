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
		return SlotModel.find({ date: { $gte: date } }).populate("doctorId");
	},

	update: (id, slot) => {
		return SlotModel.updateOne(
			{ _id: id, "slots.slot": slot },
			{ $set: { "slots.$.status": true } },
		);
	},
};

module.exports = SlotDao;
