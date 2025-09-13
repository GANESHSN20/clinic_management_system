const Joi = require("joi");

const PrescriptionValidation = {
  add: Joi.object({
    doctorId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.required": "Doctor ID is required",
        "string.pattern.base": "Doctor ID must be a valid MongoDB ObjectId",
      }),

    patientId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.required": "Patient ID is required",
        "string.pattern.base": "Patient ID must be a valid MongoDB ObjectId",
      }),

    appointmentId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.required": "Appointment ID is required",
        "string.pattern.base":
          "Appointment ID must be a valid MongoDB ObjectId",
      }),

    diagnosis: Joi.string().min(3).max(100).required().messages({
      "any.required": "Diagnosis is required",
      "string.empty": "Diagnosis cannot be empty",
    }),

    medicines: Joi.array()
      .items(Joi.string().min(3).max(100))
      .min(1)
      .required()
      .messages({
        "any.required": "At least one medicine is required",
        "array.min": "At least one medicine must be provided",
      }),

    investigations: Joi.array().items(
      Joi.object({
        testName: Joi.string().allow("").max(50).messages({
          "string.base": "Test name must be a string",
        }),
        result: Joi.string().allow("").max(100).messages({
          "string.base": "Result must be a string",
        }),
      })
    ),

    followUpDate: Joi.date()
      .iso()
      .messages({
        "date.base": "Follow-up date must be a valid date",
        "date.format": "Follow-up date must be in ISO format (YYYY-MM-DD)",
      })
      .optional(),

    notes: Joi.string().allow("").max(100).messages({
      "string.base": "Notes must be a string",
    }),
  }),

  update: Joi.object({
    doctorId: Joi.forbidden().messages({
      "any.forbidden": "doctorId cannot be updated once created",
    }),

    patientId: Joi.forbidden().messages({
      "any.forbidden": "patientId cannot be updated once created",
    }),

    appointmentId: Joi.forbidden().messages({
      "any.forbidden": "appointmentId cannot be updated once created",
    }),

    diagnosis: Joi.string().min(3).max(100).messages({
      "string.empty": "Diagnosis cannot be empty",
    }),

    medicines: Joi.array().items(Joi.string()),

    investigations: Joi.array().items(
      Joi.object({
        testName: Joi.string().allow("").max(100),
        result: Joi.string().allow("").max(100),
      })
    ),

    followUpDate: Joi.date().iso(),

    notes: Joi.string().allow("").max(200),
  }),
};

module.exports = PrescriptionValidation;
