const express = require("express");
const router = express.Router();

const PrescriptionService = require("../service/prescription-service");
const UserMiddleware = require("../middleware/user-middleware");
const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post("/add", UserMiddleware.isAuthenticate, function (req, res) {
  let payload = req.body;
  let tokenPayload = req.user;
  PrescriptionService.add(payload, tokenPayload)
    .then((result) => {
      res
        .status(CONSTANTS.HTTP_STATUS.CREATED)
        .send(
          CustomResponse.success(
            CONSTANTS.HTTP_STATUS.CREATED,
            CONSTANTS.PRESCRIPTION.CREATE,
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
              CONSTANTS.PRESCRIPTION.DUPLICATE_MESSAGE,
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

router.get(
  "/list/:patientId",
  UserMiddleware.isAuthenticate,
  function (req, res) {
    let patientId = req.params.patientId;
    PrescriptionService.list(patientId)
      .then((result) => {
        res
          .status(CONSTANTS.HTTP_STATUS.SUCCESS)
          .send(
            CustomResponse.success(
              CONSTANTS.HTTP_STATUS.SUCCESS,
              CONSTANTS.PRESCRIPTION.LIST,
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

router.patch(
  "/update/:patientId",
  UserMiddleware.isAuthenticate,
  function (req, res) {
    let patientId = req.params.patientId;
    let payload = req.body;
    let tokenPayload = req.user;
    PrescriptionService.update(payload, patientId, tokenPayload)
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
        if (typeof error === "string") {
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
