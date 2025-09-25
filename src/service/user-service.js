const UserDao = require("../dao/user-dao.js");
const Utility = require("../utils/utility.js");
const CONSTANTS = require("../utils/constant.js");
const JwtService = require("../utils/jwt-service.js");
const Config = require("../utils/config.js");

const UserService = {
	register: (payload, tokenPayload) => {
		return new Promise(async (resolve, reject) => {
			let userName =
				payload.role == "ADMIN" && !tokenPayload
					? payload.userName
					: Utility.getUsername(payload);
			payload.userName = userName;

			let password =
				payload.role == "ADMIN" && !tokenPayload
					? payload.password
					: Utility.getPassword(8);
			payload.password = password;

			let userObject = await UserDao.isUsernameExist(payload);
			console.log({ userObject });
			if (userObject) {
				if (userObject.isActive == false) {
					return reject(CONSTANTS.COMMON.SUSPENDED);
				}
				let updatedData = await UserDao.updateLoginDetails(userName, {
					password,
				});
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

			//   let age = Utility.presentAge(payload.dateOfBirth);
			//   console.log("age inside service", age);
			//   payload.age = age;

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
						// age: result.age,
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
			if (!user) {
				return reject(CONSTANTS.USER.LOGIN_ERROR);
			}
			if (user.isActive == false) {
				return reject(CONSTANTS.COMMON.SUSPENDED);
			}
			if (payload.password == user.password) {
				let tokenPayload = {
					firstName: user.firstName,
					lastName: user.lastName,
					role: user.role,
					userName: user.userName,
					_id: user._id,
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

	delete: (userName, tokenPayload) => {
		return new Promise(async (resolve, reject) => {
			try {
				if (tokenPayload.role != "ADMIN")
					return reject(CONSTANTS.USER.DEACTIVATE_UNAUTHORIZED);
				let deactivated = await UserDao.delete(userName);
				console.log(deactivated);
				if (deactivated.modifiedCount === 1) return resolve(deactivated);
				else {
					return reject(CONSTANTS.USER.DEACTIVATE_ERROR);
				}
			} catch (error) {
				return reject(error);
			}
		});
	},

	list: (tokenPayload) => {
		return new Promise(async (resolve, reject) => {
			let role = tokenPayload.role;
			let userName = tokenPayload.userName;
			// if (role === "PATIENT") {
			// 	return resolve([]);
			// }
			UserDao.list(Utility.getListByRole(role, userName))
				.then((result) => {
					return resolve(result);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	},

	update: (userName, payload) => {
		return new Promise(async (resolve, reject) => {
			try {
				let restricted = Config.restrictedFields.filter((key) =>
					Object.keys(payload).includes(key),
				);
				if (restricted.length > 0) return reject(restricted);

				let updatedData = await UserDao.update(userName, payload);
				return resolve(updatedData);
			} catch (error) {
				return reject(error);
			}
		});
	},
};

module.exports = UserService;
