const AppointmentDao = require("../dao/appointment-dao");
const SlotDao = require("../dao/slot-dao");
// const Utility = require("../utils/utility");
const CONSTANTS = require("../utils/constant");

const AppointmentService = {
	book: (payload, tokenPayload) => {
		return new Promise(async (resolve, reject) => {
			try {
				console.log("inside service");
				if (
					tokenPayload.role != "RECEPTIONIST" &&
					tokenPayload.role != "PATIENT"
				)
					return reject(CONSTANTS.APPOINTMENT.UNAUTHORIZED);

				let chosenAppointment = await AppointmentDao.isAppointmentExist(
					payload,
				);
				console.log({ chosenAppointment });

				if (chosenAppointment) {
					return reject(CONSTANTS.COMMON.APPOINTMENT_REJECT);
				}

				let result = await AppointmentDao.book(payload);
				console.log(result);
				await SlotDao.update(payload.slots.slotId, payload.slots.slot);

				console.log(result);
				return resolve(result);
			} catch (error) {
				return reject(error);
			}
		});
	},

	list: (tokenPayload) => {
		return new Promise(async (resolve, reject) => {
			try {
				console.log("inside service");

				if (tokenPayload.role == "ADMIN" || tokenPayload.role == "PATIENT") {
					return reject(CONSTANTS.APPOINTMENT.UNAUTHORIZED);
				}
				let today = new Date();
				today.setUTCHours(0, 0, 0, 0);
				let result = await AppointmentDao.list(today.toISOString());
				console.log({ result });
				return resolve(result);
			} catch (error) {
				return reject(error);
			}
		});
	},
};

module.exports = AppointmentService;
