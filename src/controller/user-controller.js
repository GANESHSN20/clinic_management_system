const express = require("express");
const router = express.Router();

const UserService = require("../service/user-service");
const UserMiddleware = require("../middleware/user-middleware");
const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post(
	"/register",
	UserMiddleware.validate,
	UserMiddleware.checkRole,
	function (req, res) {
		let bodyData = req.body;
		UserService.register(bodyData)
			.then((result) => {
				res
					.status(CONSTANTS.HTTP_STATUS.CREATED)
					.send(
						CustomResponse.success(
							CONSTANTS.HTTP_STATUS.CREATED,
							CONSTANTS.USER.REGISTER,
							result,
						),
					);
			})
			.catch((error) => {
				res
					.status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
					.send(
						CustomResponse.failure(
							CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
							CONSTANTS.COMMON.SERVER_ERROR,
							error,
						),
					);
			});
	},
);

router.post("/login", function (req, res) {
	let bodyData = req.body;
	UserService.login(bodyData)
		.then((result) => {
			res
				.status(CONSTANTS.HTTP_STATUS.SUCCESS)
				.send(
					CustomResponse.success(
						CONSTANTS.HTTP_STATUS.SUCCESS,
						CONSTANTS.USER.LOGIN,
						result,
					),
				);
		})
		.catch((error) => {
			res
				.status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
				.send(
					CustomResponse.failure(
						CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
						CONSTANTS.COMMON.SERVER_ERROR,
						error,
					),
				);
		});
});

router.get("/detail/:userName", function (req, res) {
	let userName = req.params.userName;
	UserService.detail(userName)
		.then((result) => {
			res
				.status(CONSTANTS.HTTP_STATUS.SUCCESS)
				.send(
					CustomResponse.success(
						CONSTANTS.HTTP_STATUS.SUCCESS,
						CONSTANTS.USER.GETLIST,
						result,
					),
				);
		})
		.catch((error) => {
			res
				.status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
				.send(
					CustomResponse.failure(
						CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
						CONSTANTS.COMMON.SERVER_ERROR,
						error,
					),
				);
		});
});

module.exports = router;
