const Joi = require("joi");

const AppointmentSchemaValidation = {
  book: Joi.object({
    patientId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId
      .required()
      .messages({
        "string.pattern.base": "Invalid patientId (must be a MongoDB ObjectId)",
      }),

    doctorId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid doctorId (must be a MongoDB ObjectId)",
      }),

    slots: Joi.object({
      slot: Joi.string()
        .pattern(/^([0][1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/) // strict 12-hour format
        .required()
        .messages({
          "string.pattern.base":
            "Slot must be in hh:mm AM/PM format (e.g. 09:00 AM)",
        }),

      slotId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/) // must be ObjectId
        .required()
        .messages({
          "string.pattern.base": "Invalid slotId (must be a MongoDB ObjectId)",
        }),
    }).required(),

    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
    }),

    status: Joi.string()
      .valid("BOOKED", "CANCELLED", "COMPLETED", "AVAILABLE")
      .default("BOOKED"),

    reason: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Reason is required",
      "string.min": "Reason must be at least 3 characters",
      "string.max": "Reason cannot exceed 30 characters",
    }),
  }).required(),
};

module.exports = AppointmentSchemaValidation;
