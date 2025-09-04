const express = require("express");
const router = express.Router();

const UserService = require("../service/user-service");
const UserMiddleware = require("../middleware/user-middleware");
const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post(
  "/register",
  UserMiddleware.validate,
  UserMiddleware.isAuthenticate,
  UserMiddleware.checkRole,
  function (req, res) {
    let payload = req.body;
    let tokenPayload = req.user;
    UserService.register(payload, tokenPayload)
      .then((result) => {
        res
          .status(CONSTANTS.HTTP_STATUS.CREATED)
          .send(
            CustomResponse.success(
              CONSTANTS.HTTP_STATUS.CREATED,
              CONSTANTS.USER.REGISTER,
              result
            )
          );
      })
      .catch((error) => {
        res
          .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(
            CustomResponse.error(
              CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
              CONSTANTS.COMMON.SERVER_ERROR,
              error
            )
          );
      });
  }
);

router.post("/login", function (req, res) {
  let payload = req.body;
  UserService.login(payload)
    .then((result) => {
      res
        .status(CONSTANTS.HTTP_STATUS.SUCCESS)
        .send(
          CustomResponse.success(
            CONSTANTS.HTTP_STATUS.SUCCESS,
            CONSTANTS.USER.LOGIN,
            result
          )
        );
    })
    .catch((error) => {
      res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
            CONSTANTS.COMMON.SERVER_ERROR,
            error
          )
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
            result
          )
        );
    })
    .catch((error) => {
      res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
            CONSTANTS.COMMON.SERVER_ERROR,
            error
          )
        );
    });
});

router.delete(
  "/delete/:userName",
  UserMiddleware.isAuthenticate,
  function (req, res) {
    let userName = req.params.userName;
    let tokenPayload = req.user;
    UserService.delete(userName, tokenPayload)
      .then((result) => {
        res
          .status(CONSTANTS.HTTP_STATUS.SUCCESS)
          .send(
            CustomResponse.success(
              CONSTANTS.HTTP_STATUS.SUCCESS,
              CONSTANTS.USER.DELETE,
              result
            )
          );
      })
      .catch((error) => {
        res
          .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(
            CustomResponse.error(
              CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
              CONSTANTS.COMMON.SERVER_ERROR,
              error
            )
          );
      });
  }
);

module.exports = router;
