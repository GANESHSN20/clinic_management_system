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

module.exports = router;