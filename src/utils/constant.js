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
		NOT_ALLOWED: "These fields are not allowed to update - ",
		PASSWORD: "Invalid password. Please re-enter",
		WRONG: "Something went wrong",
		SUSPENDED: "Your account has been deactivated. Please contact the admin",
		DENIED: "Access denied",
		APPOINTMENT_REJECT:
			"Appointemnt for the given information/slot is already booked. Please choose someother slot.",
	},
	USER: {
		REGISTER: "User registered successfully",
		REGISTER_ERROR: "User already exist. Proceed to login",
		LOGIN: "User logged in successfully",
		LOGIN_ERROR: "User is not registered. Please sign-up",
		DETAIL: "User details retrieved successfully",
		DEACTIVATE: "User deactivated successfully",
		DEACTIVATE_UNAUTHORIZED: "You are not authorized to use this service",
		DEACTIVATE_ERROR: "User not found or already deactivated",
		LIST: "Users list retrieved successfully",
		LIST_ERROR: "No records found",
		UPDATE: "User data updated successfully",
		UPDATE_ERROR: "But you are not allowed to update",
	},
	UTILITY: {
		USERNAME_ERROR: "Missing required fields for username genenration",
	},
	MIDDLEWARE: {
		VALIDATE: "Validation error",
		ROLE_ERROR: "You are not allowed to create a profile as role",
	},
	TOKEN: {
		INVALID: "Token is not provided",
		EXPIRED: "Token is expired",
	},
	SLOT: {
		CREATE: "Slots created successfully",
		CREATE_ERROR: "Error occured while creating slots",
		UNAUTHORIZED: "You are unauthorized to use this service",
		LIST: "Slots list retrieved successfully",
		LIST_ERROR: "No records found",
	},
	APPOINTMENT: {
		BOOK: "Appointment booked successfully",
		UNAUTHORIZED: "You are unauthorized to use this service",
		LIST: "Appointment list retrieved successfully",
	},
	PRESCRIPTION:{
		CREATE: "Prescription added successfully",
		UNAUTHORIZED: "You are unauthorized to use this service",
		DUPLICATE_ERROR: "Today's prescription for this patient already exist",
		DUPLICATE_MESSAGE:"Duplicate entry",
	    LIST: "Prescription list retrieved successfully",
		UPDATE: "Prescription updated successfully",


	}
};

module.exports = CONSTANTS;
