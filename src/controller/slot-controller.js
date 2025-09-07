const express = require("express");
const router = express.Router();

const SlotService = require("../service/slot-service");
const CONSTANTS = require("../utils/constant");
const CustomResponse = require("../utils/custom-response");

router.post("/create", function (req, res) {
  let payload = req.body;
  console.log("payload");
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
      console.log({ error });
      res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(
          CustomResponse.error(
            CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "502 error",
            error
          )
        );
    });
});

module.exports = router;
