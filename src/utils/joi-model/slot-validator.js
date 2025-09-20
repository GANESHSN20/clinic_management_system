const Joi = require("joi");

const SlotSchemaValidation = {
  create: Joi.object({
    doctorId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId validation
      .required()
      .messages({
        "any.required": "Doctor ID is required",
        "string.empty": "Doctor ID cannot be empty",
        "string.pattern.base": "Doctor ID must be a valid MongoDB ObjectId",
      }),

    date: Joi.date().iso().required().messages({
      "any.required": "Date is required",
      "date.base": "Date must be a valid date",
    }),

    startTime: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/) // strict "09:00 AM"
      .required()
      .messages({
        "any.required": "Start time is required",
        "string.empty": "Start time cannot be empty",
        "string.pattern.base": "Start time must be in hh:mm AM/PM format (e.g., 09:00 AM)",
      }),

    endTime: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/) // strict "09:00 PM"
      .required()
      .messages({
        "any.required": "End time is required",
        "string.empty": "End time cannot be empty",
        "string.pattern.base": "End time must be in hh:mm AM/PM format (e.g., 05:30 PM)",
      }),

    duration: Joi.number()
      .integer()
      .positive()
      .required()
      .strict() // ensures only numbers, not numeric strings
      .messages({
        "any.required": "Duration is required",
        "number.base": "Duration must be a number (not a string)",
        "number.positive": "Duration must be greater than 0",
        "number.integer": "Duration must be an integer value",
      }),

    slots: Joi.array()
      .items(
        Joi.object({
          slot: Joi.string()
            .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
            .required()
            .messages({
              "any.required": "Slot time is required",
              "string.empty": "Slot time cannot be empty",
              "string.pattern.base":
                "Slot must be in hh:mm AM/PM format (e.g., 09:30 AM)",
            }),

          status: Joi.boolean().default(false).messages({
            "boolean.base": "Status must be true or false",
          }),
        })
      )
    //   .min(1)
    //   .required()
    //   .messages({
    //     "any.required": "At least one slot is required",
    //     "array.min": "There must be at least one slot",
    //     "array.base": "Slots must be an array",
    //   }),
  }),
};

module.exports = SlotSchemaValidation;
