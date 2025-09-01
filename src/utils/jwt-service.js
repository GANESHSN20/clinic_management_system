const jwt = require("jsonwebtoken");

const JwtService = {
  createToken: (payload) => {
    let secretKey=process.env.SECRET_KEY;
    let token=jwt.sign(payload,secretKey);
    return token;
  },

  verifyToken:()=> {

  }
  
};

module.exports = JwtService;
