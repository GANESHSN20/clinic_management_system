const mongoose = require("mongoose");
const { Schema } = mongoose;
const Config = require("../utils/config");

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		default: "",
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	sex: {
		type: String,
		enum: Config.sex,
		required: true,
	},
	address: {
		type: String,
		default: "",
	},
	bloodGroup: {
		type: String,
		enum: Config.bloodGroup,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		enum: Config.status,
		default: "OPEN",
	},
	specialization: {
		type: String,
		required: function () {
			// specialization required only if role is "doctor"
			return this.role === "DOCTOR";
		},
	},
	qualifications: [{ type: String }],
	experience: { type: Number, default: 0 },
	consultationFee: { type: Number, default: 0 },
	isActive: {
		type: Boolean,
		default: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	role: {
		type: String,
		enum: Config.role,
		required: true,
	},
	otp: {
		type: Number,
		default: null,
	},
});

module.exports = mongoose.model("users", UserSchema);
