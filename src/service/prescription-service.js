const PrescriptionDao = require("../dao/prescription-dao");
const CONSTANTS = require("../utils/constant");

const PrescriptionService = {
  add: (payload, tokenPayload) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (tokenPayload.role != "DOCTOR")
          return reject(CONSTANTS.PRESCRIPTION.UNAUTHORIZED);

        let startOfDay = new Date().setHours(0, 0, 0, 0);
        let endOfDay = new Date().setHours(23, 59, 59, 999);

        let isPrescription = await PrescriptionDao.isPrescriptionExist(
          payload,
          startOfDay,
          endOfDay
        );
        if (isPrescription)
          return reject(CONSTANTS.PRESCRIPTION.DUPLICATE_ERROR);
        
        let result = await PrescriptionDao.add(payload);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
module.exports = PrescriptionService;
