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
				select: { firstName: 1, lastName: 1, dateOfBirth: 1 },
			});
	},
};

module.exports = AppointmentDao;
