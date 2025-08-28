console.log("user-middleware");

const CONSTANTS = require("../utils/constant");

const UserMiddleware = {
    validate: (joiUserSchema) => {
        return (req, res, next) => {
            const {error} = joiUserSchema.validate(req.body, {abortEarly:false});
            if(error){
                return res.status(400).send({
                    success:false,
                    messgae:CONSTANTS.MIDDLEWARE.VALIDATE,
                    deatils:error.details.map(err => err.message)
                });
            }
            next();
        }
    },
    
    checkRole: (req, res, next) => {
        if(req.body.role == "ADMIN"){
            return res.status(400).send({
                message:CONSTANTS.MIDDLEWARE.ROLE_ERROR
            });
        } 
        next();
    }
}

module.exports = UserMiddleware;