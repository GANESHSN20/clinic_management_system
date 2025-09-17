const mongoose = require("mongoose");
const { Schema } = mongoose;
const Config = require("../utils/config");

const AppointmentSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    slots: {
      slot: { 
		type: String, 
		required: true 
	},
      slotId: {
        type: Schema.Types.ObjectId,
        ref: "slots",
        required: true,
      },
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Config.appointmentStatus,
      default: "BOOKED",
    },

    reason: {
      type: String,
      required: true,
    },

    prescription: {
      diagnosis: {
        type: String,
        default:""
        // required: true,
      },
      medicine: [
        {
          name: {
            type: String,
            default: "",
          },
          quantity: {
            type: String,
            default: "",
          },
          doses: {
            type: String,
            enum: Config.doses,
            default: "ONE",
          },
          time: {
            type: String,
            enum:Config.time,
            default: "MORNING",
          },
          haveIt: {
            type: String,
            enum: Config.haveIt,
          },
        },
      ],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointments", AppointmentSchema);
