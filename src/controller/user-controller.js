const express = require("express");
const UserService = require("../service/user-service");
const router = express.Router();

const userMiddleware = require("../middleware/user-middleware");
const CONSTANTS = require("../utils/constant");
const customResponse = require("../utils/custom-response");

router.post(
	"/register",
	userMiddleware.validate,
	userMiddleware.checkRole,
	function (req, res) {
		let bodyData = req.body;
		UserService.register(bodyData)
			.then((result) => {
				res
					.status(CONSTANTS.HTTP_STATUS.CREATED)
					.send(
						customResponse.success(
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
						customResponse.failure(
							CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
							CONSTANTS.COMMON.SERVER_ERROR,
							error,
						),
					);
			});
	},
);

module.exports = router;
