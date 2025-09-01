const UserModel = require("../model/user-model");

const UserDAO = {
	isUserExist: (payload) => {
		return UserModel.findOne({
			userName: payload.userName,
		});
	},

	update: (userName, payload) => {
		console.log(userName, payload);

		return UserModel.updateOne({ userName: userName }, { $set: payload });
	},

	register: (payload) => {
		return UserModel({
			firstName: payload.firstName,
			lastName: payload.lastName,
			phone: payload.phone,
			dateOfBirth: payload.dateOfBirth,
			sex: payload.sex,
			address: payload.address,
			bloodGroup: payload.bloodGroup,
			userName: payload.userName,
			password: payload.password,
			email: payload.email,
			role: payload.role,
		}).save();
	},

	detail: (userName) => {
		return UserModel.findOne({ userName }, { password: 0, _id: 0 });
	},
};

module.exports = UserDAO;
