console.log("user-dao");

const UserModel = require("../model/user-model");

const UserDAO = {
    isUsernameExist: (payload) => {
        return UserModel.findOne({userName:payload.userName}, {userName:1, firstName:1, datOfBirth:1, sex:1});
    },

    register: (payload) => {
        return UserModel({
            firstName:payload.firstName,
            lastName:payload.lastName,
            phone:payload.phone,
            dateOfBirth:payload.dateOfBirth,
            sex:payload.sex,
            address:payload.address,
            bloodGroup:payload.bloodGroup,
            userName:payload.userName,
            password:payload.password,
            email:payload.email,
            status:payload.status,
            role:payload.role
        }).save();
    },
}
module.exports = UserDAO;