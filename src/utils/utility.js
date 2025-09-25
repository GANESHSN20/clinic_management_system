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
				break;
			case "PATIENT":
				payload["$or"] = [{ role: "DOCTOR" }, { userName }];
				break;
		}
		return payload;
	},

	parseTime: (timeStr) => {
		console.log({ timeStr });

		let timeSeg = timeStr.split(" ");
		let periodIndicator = timeSeg[1];

		let [hours, minutes] = timeSeg[0].split(":").map(Number);

		if (periodIndicator.toLowerCase() === "pm" && hours !== 12) hours += 12;
		if (periodIndicator.toLowerCase() === "am" && hours === 12) hours = 0;

		return hours * 60 + minutes; // total minutes
	},

	formatTime: (minutes) => {
		let hrs = Math.floor(minutes / 60);
		let mins = minutes % 60;
		const period = hrs >= 12 ? "PM" : "AM";

		if (hrs === 0) hrs = 12; // midnight
		else if (hrs > 12) hrs -= 12;

		return `${hrs}:${String(mins).padStart(2, "0")} ${period}`;
	},
	formatDate: (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	},
	randomData: (length = 6) => {
		let numberData = "";
		for (let i = 0; i < length; i++) {
			numberData += Math.floor(Math.random() * 10); // digit 0–9
		}
		return numberData;
	},

	presentAge: (dateOfBirth, currentDate = new Date()) => {
		let dob = new Date(dateOfBirth);
		let years = currentDate.getFullYear() - dob.getFullYear();
		let months = currentDate.getMonth() - dob.getMonth();
		let days = currentDate.getDate() - dob.getDate();

		if (days < 0) {
			months--;
			let previousMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				0,
			).getDate();
			days += previousMonth;
		}

		if (months < 0) {
			years--;
			months += 12;
		}
		return `${years}years ${months}months ${days}days`;
	},
};

module.exports = Utility;
