const UserDao = require("../dao/user-dao.js");
const Utility = require("../utils/utility.js");
const CONSTANTS = require("../utils/constant.js");
const JwtService = require("../utils/jwt-service.js");

const UserService = {
	register: (payload, reqUser) => {
		return new Promise(async (resolve, reject) => {
			let userName =
				payload.role == "ADMIN" && !reqUser
					? payload.userName
					: Utility.getUsername(payload);
			payload.userName = userName;

			let password =
				payload.role == "ADMIN" && !reqUser
					? payload.password
					: Utility.getPassword(8);
			payload.password = password;

			let userObject = await UserDao.isUsernameExist(payload);
			console.log({ userObject });
			if (userObject) {
				let updatedData = await UserDao.update(userName, { password });
				console.log(updatedData);
				if (updatedData.modifiedCount > 0) {
					let mailObject = { password, userName };
					// send the userName and password
				} else if (payload.role == "ADMIN") {
				} else {
					return reject("Something went wrong.");
				}

				// update the user table.
				return resolve({ password, userName });
			}

			UserDao.register(payload)
				.then((result) => {
					console.log("return data from dao to service", result);
					resolve({
						firstName: result.firstName,
						lastName: result.lastName,
						email: result.email,
						role: result.role,
						phone: result.phone,
						userName: result.userName,
					});
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	login: (payload) => {
		return new Promise(async (resolve, reject) => {
			const user = await UserDao.isUserExist(payload);
			console.log(user);
			if (!user) return reject(CONSTANTS.USER.LOGIN_ERROR);
			if (payload.password == user.password) {
				let tokenPayload = {
					firstName: user.firstName,
					lastName: user.lastName,
					role: user.role,
					userName: user.userName,
				};
				let token = JwtService.createToken(tokenPayload);
				return resolve({
					token,
					...tokenPayload,
				});
			} else {
				return reject(CONSTANTS.COMMON.PASSWORD);
			}
		});
	},

	detail: (userName) => {
		return new Promise(async (resolve, reject) => {
			UserDao.detail(userName)
				.then((result) => {
					console.log("Data from UserDao to service", result);
					return resolve(result);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	},
};

module.exports = UserService;
