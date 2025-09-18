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
        .pattern(/^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/) // strict 12-hour format
        .required()
        .messages({
          "string.pattern.base":
            "Slot must be in hh:mm AM/PM format (e.g. 9:00 AM)",
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
      .valid("BOOKED", "CANCELLED", "COMPLETED", "INPROGESS")
      .default("BOOKED"),

    reason: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Reason is required",
      "string.min": "Reason must be at least 3 characters",
      "string.max": "Reason cannot exceed 30 characters",
    }),
  }),

  update: Joi.object({
    doctorId: Joi.forbidden().messages({
      "any.forbidden": "doctorId cannot be updated once created",
    }),

    patientId: Joi.forbidden().messages({
      "any.forbidden": "patientId cannot be updated once created",
    }),

    prescription: Joi.object({
      diagnosis: Joi.string().required().messages({
        "any.required": "diagnosis is required",
        "string.empty": "diagnosis cannot be empty",
      }),

      medicine: Joi.array().items(
        Joi.object({
          name: Joi.string().allow("").messages({
            "string.base": "medicine name must be a string",
          }),
          quantity: Joi.string().allow("").messages({
            "string.base": "medicine quantity must be a string",
          }),
          doses: Joi.string().valid("ONE", "TWO", "THREE").messages({
            "any.only": "doses must be ONE, TWO, or THREE",
          }),
          time: Joi.string()
            .valid(
              "MORNING",
              "AFTERNOON",
              "NIGHT",
              "MORNING-NIGHT",
              "MORNING-AFTERNOON-NIGHT"
            )
            .messages({
              "any.only":
                "time must be MORNING, AFTERNOON, NIGHT, MORNING-NIGHT, or MORNING-AFTERNOON-NIGHT",
            }),
          haveIt: Joi.string().valid("BEFORE-FOOD", "AFTER-FOOD").messages({
            "any.only": "haveIt must be BEFORE-FOOD or AFTER-FOOD",
          }),
        })
      ),

      investigations: Joi.array().items(
        Joi.object({
          testName: Joi.string().allow("").messages({
            "string.base": "investigations testName must be a string",
          }),
          result: Joi.string().allow("").max(100).messages({
            "string.base": "investigations result must be a string",
            "string.max": "investigations result cannot exceed 100 characters",
          }),
        })
      ),

      followUpDate: Joi.date().iso().allow(null, "").messages({
        "date.base": "followUpDate must be a valid date",
      }),

      notes: Joi.string().allow("").max(100).messages({
        "string.base": "notes must be a string",
      }),
    }),
  })
    .min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    }),
};

module.exports = AppointmentSchemaValidation;
