const CONSTANTS = {
    HTTP_STATUS:{
        SUCCESS:200,
        CREATED:201,
        BAD_REQUEST:400,
        NOT_FOUND:404,
        INTERNAL_SERVER_ERROR:500
    },
    COMMON:{
        SERVER_ERROR:"Internal server error",
        BAD_REQUEST:"Invalid payload",
        PASSWORD:"Invalid password. Please re-enter"
    },
    USER:{
        REGISTER:"User registered successfully",
        REGISTER_ERROR:"User already exist. Proceed to login",
        LOGIN:"User logged in successfully",
        LOGIN_ERROR:"User is not registered. Please sign-up",
        GETLIST:"Here are the details of user"
    },
    UTILITY:{
        USERNAME_ERROR:"Missing required fields for username genenration"
    },
    MIDDLEWARE:{
        VALIDATE:"Validation error",
        ROLE_ERROR:"You are not allowed to register as admin."
    }
}

module.exports = CONSTANTS;