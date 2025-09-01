const UserModel = require("../model/user-model");

const UserDAO = {
  isUserExist: (payload) => {
    return UserModel.findOne({
      $or: [{ userName: payload.userName }, { phone: payload.phone }],
    });
  },

  update: (userName, payload) => {
    console.log(userName, payload);

    return UserModel.updateOne({ userName: userName }, { $set: payload });
  },

  register: (payload) => {
    return UserModel({
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      dateOfBirth: payload.dateOfBirth,
      sex: payload.sex,
      address: payload.address,
      bloodGroup: payload.bloodGroup,
      userName: payload.userName,
      password: payload.password,
      email: payload.email,
      role: payload.role,
    }).save();
  },
};
module.exports = UserDAO;
