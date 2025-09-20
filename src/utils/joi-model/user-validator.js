const joi = require("joi");

const JoiUserSchema = {
  register: joi
    .object({
      firstName: joi
        .string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .required(),

      lastName: joi
        .string()
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
        then: joi.string().required(),
        otherwise: joi.forbidden(),
      }),

      experience: joi.when("role", {
        is: "DOCTOR",
        then: joi
          .array()
          .items({ hospitalName: joi.string(), years: joi.string() })
          .min(1)
          .required(),
        otherwise: joi.forbidden(),
      }),

      consultationFee: joi.when("role", {
        is: "DOCTOR",
        then: joi.number().required(),
        otherwise: joi.forbidden(),
      }),
    })
    .required(),

  login: joi
    .object({
      userName: joi
        .alternatives()
        .try(
          joi.string().alphanum().label("userName"),

          joi
            .string()
            .pattern(/^\+(91|977)\d{10}$/)
            .label("phone")
          )
        .required()
        .messages({
          "alternatives.match":
            "Username must be a valid username or phone number",
            "any.only": "Username must be 'ADMIN' or a valid username"
        }),

      password: joi.string().min(8).max(12).required().messages({
        "string.empty": "Password is required",
        "string.length": "Password must be of length 8/12 characters",
      }),
    })
    .required(),

  update: joi
    .object({
      firstName: joi
        .string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(30),

      lastName: joi
        .string()
        .pattern(/^[A-Za-z]*$/)
        .allow(""),

      phone: joi.string().pattern(/^\+(91|977)\d{10}$/),

      dateOfBirth: joi.date().less("now"),

      gender: joi.string().valid("MALE", "FEMALE", "OTHER"),

      address: joi.string().max(100),

      bloodGroup: joi
        .string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),

      email: joi.string().email({ tlds: { allow: ["com"] } }),

      role: joi.string().valid("PATIENT", "DOCTOR", "RECEPTIONIST", "ADMIN"),

      specialization: joi.when("role", {
        is: "DOCTOR",
        then: joi.string(),
        otherwise: joi.forbidden(),
      }),

      qualifications: joi.when("role", {
        is: "DOCTOR",
        then: joi.string(),
        otherwise: joi.forbidden(),
      }),

      experience: joi.when("role", {
        is: "DOCTOR",
        then: joi.array().items({
          hospitalName: joi.string(),
          years: joi.string(),
        }),
        otherwise: joi.forbidden(),
      }),

      consultationFee: joi.when("role", {
        is: "DOCTOR",
        then: joi.number(),
        otherwise: joi.forbidden(),
      }),
    })
    .min(1),
};
module.exports = JoiUserSchema;
