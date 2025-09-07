const SlotDao = require("../dao/slot-dao");
const Helpers = require("../utils/helpers");

const SlotService = {
  create: (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const start = Helpers.parseTime(payload.startTime);
        const end = Helpers.parseTime(payload.endTime);

        const slots = [];
        for (let mins = start; mins < end; mins += payload.duration) {
          slots.push({ slot: Helpers.formatTime(mins), status: false });
        }
        payload.slots = slots;
        let result = await SlotDao.create(payload);
        console.log(result);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },
};

module.exports = SlotService;
