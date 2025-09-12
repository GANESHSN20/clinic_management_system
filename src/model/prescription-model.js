const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrescriptionSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "appointments",
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medicines: {
      type: [String],
      required: true,
    },
    investigations: [
      {
        testName: {
          type: String,
          default: "",
        },
        result: {
          type: String,
          default: "",
        },
      },
    ],
    followUpDate: {
      type: Date,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("prescriptions", PrescriptionSchema);
