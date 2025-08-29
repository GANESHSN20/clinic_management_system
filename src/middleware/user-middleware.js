const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");
const UserSchemaValidator = require("../utils/joi-model/user-validator");

const UserMiddleware = {
	validate: (req, res, next) => {
		if (req.body) {
			const { error } = UserSchemaValidator.validate(req.body, { abortEarly: false });
			if (error) {
				return res.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST).send(
					CustomResponse.failure(
						CONSTANTS.HTTP_STATUS.BAD_REQUEST,
						CONSTANTS.MIDDLEWARE.VALIDATE,
						error.details.map((err) => err.message),
					),
				);
			}
			next();
		}
	},

	checkRole: (req, res, next) => {
		if (req.body && req.body.role == "ADMIN") {
			return res
				.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
				.send(
					CustomResponse.failure(
						CONSTANTS.HTTP_STATUS.BAD_REQUEST,
						CONSTANTS.COMMON.BAD_REQUEST,
						CONSTANTS.MIDDLEWARE.ROLE_ERROR,
					),
				);
		}
		next();
	},
};

module.exports = UserMiddleware;
