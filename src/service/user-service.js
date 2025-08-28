console.log("user-service");

const UserDao = require("../dao/user-dao.js");
const Utility = require("../utils/utility.js");
const CONSTANTS = require("../utils/constant.js");

const UserService = {
    register: (payload) => {
        return new Promise(async(resolve, reject) => {
            
            let userName = Utility.generateUsername(payload);
            payload.userName = userName;

            let password = Utility.generatePassword();
            payload.password = password;
            
            let isUserExist = await UserDao.isUsernameExist(payload);
            if(isUserExist)
                 return reject(CONSTANTS.USER.REGISTER_ERROR);


            UserDao.register(payload).then(result => {
                console.log("return data from dao to service", result);
                resolve({
                    message:CONSTANTS.USER.REGISTER,
                    data:{
                        userName:result.userName,
                        password:result.password
                    }
                })
            })
            .catch(error => {
                reject(error)
            });
        });
   }
    
}

module.exports = UserService;