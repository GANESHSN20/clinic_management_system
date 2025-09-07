const UserModel = require("../model/user-model");

const UserDAO = {
	isUsernameExist: (payload) => {
		return UserModel.findOne({
			userName: payload.userName,
		});
	},

	updateLoginDetails: (userName, payload) => {
		console.log(userName, payload);

		return UserModel.updateOne({ userName }, { $set: payload });
	},

	register: (payload) => {
		return UserModel({
			firstName: payload.firstName,
			lastName: payload.lastName,
			phone: payload.phone,
			dateOfBirth: payload.dateOfBirth,
			gender: payload.gender,
			address: payload.address,
			bloodGroup: payload.bloodGroup,
			userName: payload.userName,
			password: payload.password,
			email: payload.email,
			role: payload.role,
			specialization: payload.specialization,
			qualifications: payload.qualifications,
			experience: payload.experience,
			consultationFee: payload.consultationFee,
		}).save();
	},

	detail: (userName) => {
		return UserModel.findOne({ userName }, { password: 0, _id: 0 });
	},

	isUserExist: (payload) => {
		let isNumber = /^\+\d+$/.test(payload.userName);
		let condition = isNumber
			? { phone: payload.userName }
			: { userName: payload.userName };

		return UserModel.findOne(condition);
	},

	delete: (userName) => {
		return UserModel.updateOne({ userName }, { $set: { isActive: false } });
	},

	//  delete: (userName) => {
	//   return UserModel.deleteOne({ userName });
	// },

	list: (role) => {
		return UserModel.find(role, { password: 0, _id: 0 });
	},

	update: (userName, payload) => {
		return UserModel.updateOne({ userName }, { $set: payload });
	},
};

module.exports = UserDAO;
