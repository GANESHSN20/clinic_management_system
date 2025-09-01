const jwt = require("jsonwebtoken");

const JwtService = {
	createToken: (payload) => {
		let secretKey = process.env.SECRET_KEY;
		let token = jwt.sign(payload, secretKey); /// expiretime
		return token;
	},

	verifyToken: () => {},
};

module.exports = JwtService;
