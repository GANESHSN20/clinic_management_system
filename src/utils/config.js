const Config = {
	bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
	gender: ["MALE", "FEMALE", "OTHER"],
	status: ["OPEN", "ONGOING", "CLOSED"],
	role: ["DOCTOR", "ADMIN", "RECEPTIONIST", "PATIENT"],
	restrictedFields: [
		"firstName",
		"gender",
		"dateOfBirth",
		"phone",
		"userName",
		"role",
		"password",
	],
	appointmentStatus:["BOOKED", "CANCELLED", "COMPLETED", "AVAILABLE"]
};

module.exports = Config;
