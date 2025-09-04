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
		type: String,
		required: true,
		unique: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	gender: {
		type: String,
		enum: Config.gender,
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
	qualifications: [
		{
			type: String,
			required: function () {
				// specialization required only if role is "doctor"
				return this.role === "DOCTOR";
			},
		},
	],
	experience: {
		type:String,
		hospitalName: {
			type: String,
			default: "",
		},
		years: {
			type: Number,
			default: 0,
		},
		required: function () {
			// specialization required only if role is "doctor"
			return this.role === "DOCTOR";
		},
	},
	consultationFee: {
		type: Number,
		required: function () {
			// specialization required only if role is "doctor"
			return this.role === "DOCTOR";
		},
	},
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
