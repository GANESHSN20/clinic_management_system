console.log("user-service");

const UserDao = require("../dao/user-dao.js");
const Utility = require("../utils/utility.js");

const UserService = {
	register: (payload) => {
		return new Promise(async (resolve, reject) => {
			let userName =
				payload.role == "ADMIN"
					? payload.userName
					: Utility.getUsername(payload);
			payload.userName = userName;

			let password =
				payload.role == "ADMIN" ? payload.password : Utility.getPassword(8);
			payload.password = password;

			let isUserExist = await UserDao.isUsernameExist(payload);
			console.log({ isUserExist });
			if (isUserExist) {
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
};

module.exports = UserService;
