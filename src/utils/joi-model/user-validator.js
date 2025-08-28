const joi = require("joi");

const JoiUserSchema = joi
	.object({
		firstName: joi
			.string()
			.pattern(/^[A-Za-z]+$/)
			.min(2)
			.max(30)
			.required(),

		lastName: joi
			.string()
			.pattern(/^[A-Za-z]+$/)
			.min(2)
			.max(30),

		phone: joi
			.string()
			.pattern(/^\+(91|977)\d{10}$/)
			.required(),

		dateOfBirth: joi.date().less("now").required(),

		sex: joi.string().valid("MALE", "FEMALE", "OTHER").required(),

		address: joi.string().max(100),

		bloodGroup: joi
			.string()
			.valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
			.required(),

		email: joi
			.string()
			.email({ tlds: { allow: ["com"] } })
			.required(),

		role: joi
			.string()
			.valid("PATIENT", "DOCTOR", "RECEPTIONIST", "ADMIN")
			.required(),
	})
	.required();

module.exports = JoiUserSchema;
