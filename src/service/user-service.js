console.log("user-service");

const UserDao = require("../dao/user-dao.js");

const UserService = {
    register:(payload)=>{
        return new Promise(async(resolve, reject)=>{
            let isUserExist=await UserDao.isUsernameExist(payload);
            if(isUserExist)
                 return reject("Username already exist. Please signin");
            
            UserDao.register(payload).then(result=>{
                console.log("Returned data from dao to service",result)
                resolve({
                    message:"User registered successfully",
                    data:{
                        firstname:result.firstname,
                        usermame:result.username,
                        role:result.role,
                        _id:result._id
                    }
                }).catch(error=>{
                    reject(error)
                });
            }) ; 
        });
   }
    
}

module.exports = UserService;