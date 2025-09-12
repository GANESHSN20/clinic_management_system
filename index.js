const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const CustomResponse = require("./src/utils/custom-response.js");
const CONSTANT = require("./src/utils/constant.js");
const UserService = require("./src/service/user-service.js");

require("dotenv").config();
const port = process.env.PORT;

require("./database.js");

app.use("/dashboard", (req, res) => {
	res.sendFile(__dirname + "/public/dashboard.html");
});

app.use("/user", (req, res) => {
	res.sendFile(__dirname + "/public/user.html");
});

app.use("/slot", (req, res) => {
	res.sendFile(__dirname + "/public/slot.html");
});

app.use("/appointment", (req, res) => {
	res.sendFile(__dirname + "/public/appointment.html");
});
app.use("/prescription", (req, res) => {
	res.sendFile(__dirname + "/public/prescription.html");
});

app.use("/users", require("./src/controller/user-controller.js"));
app.use("/slots", require("./src/controller/slot-controller.js"));
app.use("/appointments", require("./src/controller/appointment-controller.js"));
app.use(
	"/prescriptions",
	require("./src/controller/prescription-controller.js"),
);
// console.log(process.env);

app.use("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

let adminPayload = {
	firstName: "ADMIN",
	lastName: "USER",
	phone: 8792315230,
	dateOfBirth: "1995-09-09",
	gender: "OTHER",
	bloodGroup: "A+",
	email: process.env.EMAIL,
	address: "Other",
	role: "ADMIN",
	userName: process.env.USER_NAME,
	password: process.env.PASSWORD,
};

UserService.register(adminPayload, undefined)
	.then((result) => {
		console.log(
			CustomResponse.success(
				CONSTANT.HTTP_STATUS.CREATED,
				CONSTANT.USER.REGISTER,
				result,
			),
		);
	})
	.catch((error) => {
		console.log(
			CustomResponse.error(
				CONSTANT.HTTP_STATUS.INTERNAL_SERVER_ERROR,
				CONSTANT.COMMON.SERVER_ERROR,
				error,
			),
		);
	});

app.listen(port, () => {
	console.log(`Server started at the port ${port}.`);
});
