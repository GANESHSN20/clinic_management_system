const jwt = require("jsonwebtoken");
const JwtService = {
	createToken: (payload) => {
		let token = jwt.sign(payload, process.env.SECRET_KEY); /// expiretime
		return token;
	},

	verifyToken: (token) => {
		try {
			return jwt.verify(token, process.env.SECRET_KEY);
		} catch (error) {
			console.log(error.message);
			return error;
		}
	},
};

module.exports = JwtService;
