const express = require("express");
const router = express.Router();

const AppointmentService = require("../service/appointment-service");
const AppointmentMiddleware = require("../middleware/appointment-middleware");
const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post(
  "/book",
  AppointmentMiddleware.isAuthenticate,
  AppointmentMiddleware.bookValidate,
  function (req, res) {
    let payload = req.body;
    let tokenPayload = req.user;
    AppointmentService.book(payload, tokenPayload)
      .then((result) => {
        res
          .status(CONSTANTS.HTTP_STATUS.CREATED)
          .send(
            CustomResponse.success(
              CONSTANTS.HTTP_STATUS.CREATED,
              CONSTANTS.APPOINTMENT.BOOK,
              result
            )
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
                error
              )
            );
        } else {
          res
            .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .send(
              CustomResponse.error(
                CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
                CONSTANTS.COMMON.SERVER_ERROR,
                error
              )
            );
        }
      });
  }
);

router.get("/list", AppointmentMiddleware.isAuthenticate, function (req, res) {
  let tokenPayload = req.user;
  AppointmentService.list(tokenPayload)
    .then((result) => {
      res
        .status(CONSTANTS.HTTP_STATUS.SUCCESS)
        .send(
          CustomResponse.success(
            CONSTANTS.HTTP_STATUS.SUCCESS,
            CONSTANTS.APPOINTMENT.LIST,
            result
          )
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
              error
            )
          );
      } else {
        res
          .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send(
            CustomResponse.error(
              CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
              CONSTANTS.COMMON.SERVER_ERROR,
              error
            )
          );
      }
    });
});

router.patch(
  "/update/:appointmentId",
  AppointmentMiddleware.isAuthenticate,
  AppointmentMiddleware.updateValidate,
  function (req, res) {
    let payload = req.body;
    let appointmentId = req.params.appointmentId;
    let tokenPayload = req.user;
    AppointmentService.update(payload, appointmentId, tokenPayload)
      .then((result) => {
        res
          .status(CONSTANTS.HTTP_STATUS.SUCCESS)
          .send(
            CustomResponse.success(
              CONSTANTS.HTTP_STATUS.SUCCESS,
              CONSTANTS.PRESCRIPTION.UPDATE,
              result
            )
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
                error
              )
            );
        } else {
          res
            .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .send(
              CustomResponse.error(
                CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
                CONSTANTS.COMMON.SERVER_ERROR,
                error
              )
            );
        }
      });
  }
);

module.exports = router;
