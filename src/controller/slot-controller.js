const express = require("express");
const router = express.Router();

const SlotService = require("../service/slot-service");
const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post("/", function (req, res) {
  let payload = req.body;
  SlotService.create(payload)
    .then((result) => {
      res
        .status(CONSTANTS.HTTP_STATUS.CREATED)
        .send(
          CustomResponse.success(
            CONSTANTS.HTTP_STATUS.CREATED,
            CONSTANTS.SLOT.CREATED,
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

module.exports = router;
