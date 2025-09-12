const SlotDao = require("../dao/slot-dao");
const Utility = require("../utils/utility");
const CONSTANTS = require("../utils/constant");

const SlotService = {
  create: (payload, tokenPayload) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (tokenPayload.role != "RECEPTIONIST")
          return reject(CONSTANTS.SLOT.UNAUTHORIZED);
        const start = Utility.parseTime(payload.startTime);
        const end = Utility.parseTime(payload.endTime);
        console.log("start end", start, end);

        const slots = [];
        for (let mins = start; mins < end; mins += payload.duration) {
          slots.push({ slot: Utility.formatTime(mins), status: false });
        }
        console.log("slot", JSON.stringify(slots));

        payload.slots = slots;
        let result = await SlotDao.create(payload);
        console.log(result);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },

  list: (tokenPayload) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("inside service");

        if (tokenPayload.role == "ADMIN") {
          return reject(CONSTANTS.SLOT.UNAUTHORIZED);
        }
        let today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        let result = await SlotDao.list(today.toISOString());
        console.log({ result });
        if (tokenPayload.role == "PATIENT") {
          let slotList = result.map((item) => {
            return { slots: item.slots, doctorId: item.doctorId, date:item.date };
          });
          return resolve(slotList);
        }
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },
};

module.exports = SlotService;
