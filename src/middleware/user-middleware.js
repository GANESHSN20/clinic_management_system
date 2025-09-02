const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");
const UserSchemaValidator = require("../utils/joi-model/user-validator");
const JwtService = require("../utils/jwt-service");
const Utility = require("../utils/utility");
const UserMiddleware = {
	validate: (req, res, next) => {
		if (req.body) {
			const { error } = UserSchemaValidator.validate(req.body, {
				abortEarly: false,
			});
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
		let logedInUser = req.user;
		Utility.log(logedInUser);
		if (
			req.body &&
			(logedInUser.role == "RECEPTIONIST" ||
				logedInUser.role == "DOCTOR" ||
				logedInUser.role == "PATIENT") &&
			(req.body.role == "ADMIN" ||
				req.body.role == "RECEPTIONIST" ||
				req.body.role == "DOCTOR")
		) {
			return res
				.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
				.send(
					CustomResponse.failure(
						CONSTANTS.HTTP_STATUS.BAD_REQUEST,
						CONSTANTS.COMMON.BAD_REQUEST,
						`${CONSTANTS.MIDDLEWARE.ROLE_ERROR} ${req.body.role}`,
					),
				);
		}
		next();
	},
	isAuthenticate: (req, res, next) => {
		let token = req.headers.authorization;
		if (!token) return res.status(401).send({ message: "Toekn not provided" });
		let userPayload = JwtService.verifyToken(token);
		if (typeof userPayload == "string")
			return res.status(400).send({ message: userPayload });
		req.user = userPayload;
		next();
	},
};

module.exports = UserMiddleware;
