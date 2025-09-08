const jwt = require("jsonwebtoken");
const CONSTANTS = require("./constant");

const JwtService = {
	createToken: (payload) => {
		let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h"}); /// expiretime
		return token;
	},

	verifyToken: (token) => {
		try {
			return jwt.verify(token, process.env.SECRET_KEY);
		} catch (error) {
				if(error.name === "TokenExpiredError")
					return CONSTANTS.TOKEN.EXPIRED;
				else{
					console.log(error.message);
					return error;
				}
		}
	},
};

module.exports = JwtService;
