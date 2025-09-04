const joi = require("joi");

const JoiUserSchema = joi
  .object({
    firstName: joi
      .string()
      .pattern(/^[A-Za-z]+$/)
      .min(3)
      .max(30)
      .required(),

    lastName: joi.string()
      .pattern(/^[A-Za-z]*$/) // only letters, allows empty string
      .optional() // field itself is optional
      .allow(""),

    phone: joi
      .string()
      .pattern(/^\+(91|977)\d{10}$/)
      .required(),

    dateOfBirth: joi.date().less("now").required(),

    gender: joi.string().valid("MALE", "FEMALE", "OTHER").required(),

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

    specialization: joi.when("role", {
      is: "DOCTOR",
      then: joi.string().required(),
      otherwise: joi.forbidden(),
    }),

    qualifications: joi.when("role", {
      is: "DOCTOR",
      then: joi.array().items(joi.string()).min(1).required(),
      otherwise: joi.forbidden(),
    }),

    experience: joi.when("role", {
      is: "DOCTOR",
      then: joi.string().required(),
      otherwise: joi.forbidden(),
    }),

    consultationFee: joi.when("role", {
      is: "DOCTOR",
      then: joi.number().required(),
      otherwise: joi.forbidden(),
    }),
  })
  .required();

module.exports = JoiUserSchema;
