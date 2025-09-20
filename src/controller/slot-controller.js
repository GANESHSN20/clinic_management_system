const express = require("express");
const router = express.Router();

const SlotService = require("../service/slot-service");
const SlotMiddleware = require("../middleware/slot-middleware");
const UserMiddleware = require("../middleware/user-middleware");

const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post(
	"/create",
	UserMiddleware.isAuthenticate,
	SlotMiddleware.createValidate,
	function (req, res) {
		let payload = req.body;
		let tokenPayload = req.user;
		SlotService.create(payload, tokenPayload)
			.then((result) => {
				res
					.status(CONSTANTS.HTTP_STATUS.CREATED)
					.send(
						CustomResponse.success(
							CONSTANTS.HTTP_STATUS.CREATED,
							CONSTANTS.SLOT.CREATE,
							result,
						),
					);
			})
			.catch((error) => {
				if (typeof error == "string") {
					res
						.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
						.send(
							CustomResponse.error(
								CONSTANTS.HTTP_STATUS.BAD_REQUEST,
								CONSTANTS.COMMON.DENIED,
								error,
							),
						);
				} else {
					res
						.status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
						.send(
							CustomResponse.error(
								CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
								CONSTANTS.COMMON.SERVER_ERROR,
								error,
							),
						);
				}
			});
	},
);

router.get("/list", UserMiddleware.isAuthenticate, function (req, res) {
	let tokenPayload = req.user;
	SlotService.list(tokenPayload)
		.then((result) => {
			res
				.status(CONSTANTS.HTTP_STATUS.SUCCESS)
				.send(
					CustomResponse.success(
						CONSTANTS.HTTP_STATUS.SUCCESS,
						CONSTANTS.SLOT.LIST,
						result,
					),
				);
		})
		.catch((error) => {
			if (typeof error == "string") {
				res
					.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
					.send(
						CustomResponse.error(
							CONSTANTS.HTTP_STATUS.BAD_REQUEST,
							CONSTANTS.COMMON.DENIED,
							error,
						),
					);
			} else {
				res
					.status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
					.send(
						CustomResponse.error(
							CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
							CONSTANTS.COMMON.SERVER_ERROR,
							error,
						),
					);
			}
		});
});

module.exports = router;
