console.log("user-dao");

const UserDAO = {
    isUsernameExist: (payload) => {
        return userModel.findOne({username:payload.username}, {username:1, firstname:1, datOfBirth:1, sex:1});
    },

    register: (payload) => {
        return userModel({
            firstname:payload.firstname,
            lastname:payload.lastname,
            phone:payload.phone,
            dateOfBirth:payload.dateOfBirth,
            sex:payload.sex,
            address:payload.address,
            blooadGroup:payload.blooadGroup,
            username:payload.username,
            status:payload.status,
            isActive:payload.isActive,
            role:payload.role
        }).save();
    }
}
module.exports = UserDAO;