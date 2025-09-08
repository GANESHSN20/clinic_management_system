const mongoose = require("mongoose");
const { Schema } = mongoose;

const SlotSchema = new Schema(
	{
		doctorId: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},

		startTime: {
			type: String,
			required: true,
		},

		endTime: {
			type: String,
			required: true,
		},
		
		duration: {
			type: Number,
			required: true,
		},

		slots: [
			{
				slot: {
					type: String,
					required: true,
				},
				status: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("slots", SlotSchema);
