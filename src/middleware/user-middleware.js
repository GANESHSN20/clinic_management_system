const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");
const UserSchemaValidator = require("../utils/joi-model/user-validator");
const JwtService = require("../utils/jwt-service");
const Utility = require("../utils/utility");

const UserMiddleware = {
  registerValidate: (req, res, next) => {
    if (req.body) {
      const { error } = UserSchemaValidator.register.validate(req.body, {
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

  loginValidate: (req, res, next) => {
    if (req.body) {
      const { error } = UserSchemaValidator.login.validate(req.body, {
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

  updateValidate: (req, res, next) => {
    if (req.body) {
      const { error } = UserSchemaValidator.update.validate(req.body, {
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
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.BAD_REQUEST,
            CONSTANTS.COMMON.BAD_REQUEST,
            `${CONSTANTS.MIDDLEWARE.ROLE_ERROR} ${req.body.role}`
          )
        );
    }
    next();
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

module.exports = UserMiddleware;
