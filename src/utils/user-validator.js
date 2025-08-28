const joi = require("joi");

const joiUserSchema = joi.object({
    firstName: joi.string().pattern(/^[A-Za-z]+$/).trim().min(2).max(30).required(),
    lastName: joi.string().pattern(/^[A-Za-z\s]+$/).trim().min(2).max(30),
    phone: joi.string().trim().pattern(/^\+(91|977)\d{10}$/).required(),
    dateOfBirth: joi.date().less("now").required(),
    sex: joi.string().valid("MALE", "FEMALE", "OTHER").required(),
    address: joi.string().trim().max(100).required(),
    bloodGroup: joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").required(),
    email: joi.string().trim().email({}).required(),
    role: joi.string().valid("PATIENT", "DOCTOR", "RECEPTIONIST", "ADMIN").required()
});

module.exports=joiUserSchema;