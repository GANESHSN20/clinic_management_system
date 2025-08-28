console.log("user-controller");

const express = require("express");
const UserService = require("../service/user-service");
const router = express.Router();

const joiUserSchema = require("../utils/user-validator");
const userMiddleware = require("../middleware/user-middleware");
const CONSTANTS = require("../utils/constant");

router.post("/register", userMiddleware.validate(joiUserSchema), userMiddleware.checkRole, function(req, res){
    let bodyData = req.body;
    UserService.register(bodyData)
    .then(result => {
        res.status(CONSTANTS.HTTP_STATUS.CREATED).send(result)
    })
    .catch(error => {
        res.status(CONSTANTS.HTTP_STATUS.SERVER_ERROR).send(error)
    });
    console.log("Body data in controller", bodyData);
});

module.exports = router;