const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");
const AppointemntSchemaValidator = require("../utils/joi-model/appointment-validator");
const JwtService = require("../utils/jwt-service");

const AppointmentMiddleware = {
  bookValidate: (req, res, next) => {
    if (req.body) {
      const { error } = AppointemntSchemaValidator.book.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST).send(
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.BAD_REQUEST,
            CONSTANTS.MIDDLEWARE.VALIDATE,
            error.details.map((err) => err.message)
          )
        );
      }
      next();
    }
  },

  isAuthenticate: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
      return res
        .status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
        .send(
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.UNAUTHORIZED,
            CONSTANTS.COMMON.BAD_REQUEST,
            CONSTANTS.TOKEN.INVALID
          )
        );
    let tokenPayload = JwtService.verifyToken(token);
    if (typeof tokenPayload == "string")
      return res
        .status(CONSTANTS.HTTP_STATUS.FORBIDDEN)
        .send(
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.FORBIDDEN,
            CONSTANTS.COMMON.SERVER_ERROR,
            tokenPayload
          )
        );
    req.user = tokenPayload;
    next();
  },
  
};

module.exports = AppointmentMiddleware;
