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
        BAD_REQUEST:"Invalid payload"
    },
    USER:{
        REGISTER:"User registered successfully",
        REGISTER_ERROR:"User already exist. Proceed to login"
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