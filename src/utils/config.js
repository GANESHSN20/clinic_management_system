const Config = {
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  gender: ["MALE", "FEMALE", "OTHER"],
  status: ["OPEN", "ONGOING", "CLOSED"],
  role: ["DOCTOR", "ADMIN", "RECEPTIONIST", "PATIENT"],
  restrictedFields: [
    "firstName",
    "gender",
    "dateOfBirth",
    "phone",
    "userName",
    "role",
    "password",
  ],
  appointmentStatus: ["BOOKED", "INPROGRESS", "CANCELLED", "COMPLETED"],
  doses: ["ONE", "TWO", "THREE"],
  time: [
    "MORNING",
    "AFTERNOON",
    "NIGHT",
    "MORNING-NIGHT",
    "MORNING-AFTERNOON-NIGHT",
  ],
  haveIt:["BEFORE-FOOD", "AFTER-FOOD"]
};

module.exports = Config;
