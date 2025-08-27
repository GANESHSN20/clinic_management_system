console.log("user-controller");

const express = require("express");
const UserService = require("../service/user-service");
const router = express.Router();

router.post("/register", function(req, res){
    let bodyData = req.body;
    UserService.register(bodyData)
    .then(result => {
        res.status(201).send(result)
    })
    .catch(error => {
        res.status(500).send(error)
    });
    console.log("Body data in controller", bodyData);
});


module.exports = router;