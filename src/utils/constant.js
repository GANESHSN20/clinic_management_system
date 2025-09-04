const CONSTANTS = {
	HTTP_STATUS: {
		SUCCESS: 200,
		CREATED: 201,
		NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		INTERNAL_SERVER_ERROR: 500,
	},
	COMMON: {
		SERVER_ERROR: "Internal server error",
		BAD_REQUEST: "Invalid payload",
		PASSWORD: "Invalid password. Please re-enter",
	},
	USER: {
		REGISTER: "User registered successfully",
		REGISTER_ERROR: "User already exist. Proceed to login",
		LOGIN: "User logged in successfully",
		LOGIN_ERROR: "User is not registered. Please sign-up",
		DETAIL: "User details retrieved successfully",
		DELETE: "User deleted successfully",
		DELETE_ERROR: "You are not authorized to use this service",
		LIST: "Users list retrieved successfully",
		LIST_ERROR: "No records found",
		UPDATE: "User data updated successfully"
	},
	UTILITY: {
		USERNAME_ERROR: "Missing required fields for username genenration",
	},
	MIDDLEWARE: {
		VALIDATE: "Validation error",
		ROLE_ERROR: "You are not allowed to create a profile as role",
	},
	TOKEN:{
		INVALID:"Token is not provided",
		EXPIRED:"Token is expired"
	}
};

module.exports = CONSTANTS;
