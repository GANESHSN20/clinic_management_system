console.log("user-middleware");

const CONSTANTS = require("../utils/constant");
const customResponse = require("../utils/custom-response");

const UserMiddleware = {
    validate: (joiUserSchema) => {
        return (req, res, next) => {
            const {error} = joiUserSchema.validate(req.body, {abortEarly:false});
            if(error){
                return res.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST).send(customResponse.failure(
                    CONSTANTS.HTTP_STATUS.BAD_REQUEST,
                    CONSTANTS.MIDDLEWARE.VALIDATE,
                    error.details.map(err => err.message)
                ));
            }
            next();
        }
    },
    
    checkRole: (req, res, next) => {
        if(req.body.role == "ADMIN"){
            return res.status(CONSTANTS.HTTP_STATUS.BAD_REQUEST).send(customResponse.failure(
                CONSTANTS.HTTP_STATUS.BAD_REQUEST,
                CONSTANTS.COMMON.BAD_REQUEST,              
                CONSTANTS.MIDDLEWARE.ROLE_ERROR
            ));
        } 
        next();
    }
}

module.exports = UserMiddleware;