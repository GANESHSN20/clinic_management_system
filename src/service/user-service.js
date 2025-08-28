console.log("user-service");

const UserDao = require("../dao/user-dao.js");
const Utility = require("../utils/utility.js");

const UserService = {
    register: (payload) => {
        return new Promise(async(resolve, reject) => {
            
            let userName = Utility.generateUsername(payload);
            payload.userName = userName;

            let password = Utility.generatePassword();
            payload.password = password;
            
            let isUserExist = await UserDao.isUsernameExist(userName);
            if(isUserExist)
                 return reject("User already exist. Proceed to login");


            UserDao.register(payload, userName).then(result => {
                console.log("return data from dao to service", result);
                resolve({
                    message:"User registered successfully",
                    data:{
                        userName:result.userName,
                        password:result.password,
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