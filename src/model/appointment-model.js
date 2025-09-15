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
			slot: { type: String, required: true },
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
				required: true,
			},
			medicines: {
				type: [String],
				default: [],
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
	},
	{ timestamps: true },
);

module.exports = mongoose.model("appointments", AppointmentSchema);
