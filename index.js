const express = require("express");
const app = express();
app.use(express.json());

const CustomResponse = require("./src/utils/custom-response.js");
const CONSTANT = require("./src/utils/constant.js");
const UserService = require("./src/service/user-service.js");

require("dotenv").config();
const port = process.env.PORT;

require("./database.js");

app.use("/users", require("./src/controller/user-controller.js"));
let adminPayload = {
	firstName: "ADMIN",
	lastName: "USER",
	phone: "+910000000",
	dateOfBirth: "1995-09-09",
	sex: "OTHER",
	bloodGroup: "A+",
	email: process.env.EMAIL,
	address: "Other",
	role: "ADMIN",
	userName: process.env.USERNAME,
	password: process.env.PASSWORD,
};
UserService.register(adminPayload)
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
			CustomResponse.failure(
				CONSTANT.HTTP_STATUS.INTERNAL_SERVER_ERROR,
				CONSTANT.COMMON.SERVER_ERROR,
				error,
			),
		);
	});

app.listen(port, () => {
	console.log(`Server started at the port ${port}.`);
});
