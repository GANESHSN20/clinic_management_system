const Config = {
	bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
	gender: ["MALE", "FEMALE", "OTHER"],
	status: ["OPEN", "ONGOING", "CLOSED"],
	role: ["DOCTOR", "ADMIN", "RECEPTIONIST", "PATIENT"],
	ADMIN:{},
	DOCTOR:{role:{$in:["RECEPTIONIST","PATIENT"]}},
	RECEPTIONIST:{role:"PATIENT"}
};

module.exports = Config;
