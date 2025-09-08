const { randomInt } = require("crypto");
const CONSTANTS = require("./constant");

const Utility = {
	getUsername: (payload) => {
		if (!payload.firstName || !payload.dateOfBirth || !payload.gender) {
			return { message: CONSTANTS.UTILITY.USERNAME_ERROR };
		}
		const fname = payload.firstName.trim().toUpperCase();
		const dob = new Date(payload.dateOfBirth);
		const year = dob.getFullYear();
		const month = String(dob.getMonth() + 1).padStart(2, "0");
		const day = String(dob.getDate()).padStart(2, "0");
		const genderLetter = payload.gender[0];

		return `CMS${year}${genderLetter}${month}${fname}${day}`;
	},

	getPassword: (length = 8) => {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let password = [];
		for (let i = 0; i < length; i++) {
			const index = randomInt(0, chars.length);
			password.push(chars.charAt(index));
		}
		return password.join("");
	},

	log: (message, ...rest) => {
		console.log(message, rest);
	},

	getListByRole: (role, userName) => {
		let payload = {};
		switch (role) {
			case "ADMIN":
				break;
			case "RECEPTIONIST":
				payload["role"] = { $in: ["DOCTOR", "PATIENT"] };
				break;
			case "DOCTOR":
				payload["role"] = { $in: ["RECEPTIONIST", "PATIENT"] };
			case "PATIENT":
				payload["$or"] = [{ role: "DOCTOR" }, { userName }];
				break;
		}
		return payload;
	},
};

module.exports = Utility;
