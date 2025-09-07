const Helpers = {
	parseTime: (timeStr) => {
		console.log({ timeStr });

		let timeSeg = timeStr.split(" ");
		let periodIndicator = timeSeg[1];

		let [hours, minutes] = timeSeg[0].split(":").map(Number);

		if (periodIndicator.toLowerCase() === "pm" && hours !== 12) hours += 12;
		if (periodIndicator.toLowerCase() === "am" && hours === 12) hours = 0;

		return hours * 60 + minutes; // total minutes
	},

	formatTime: (minutes) => {
		let hrs = Math.floor(minutes / 60);
		let mins = minutes % 60;
		const period = hrs >= 12 ? "PM" : "AM";

		if (hrs === 0) hrs = 12; // midnight
		else if (hrs > 12) hrs -= 12;

		return `${hrs}:${String(mins).padStart(2, "0")} ${period}`;
	},
};

// function generateSlots({ startTime, endTime, duration }) {
//   const start = parseTime(startTime);
//   const end = parseTime(endTime);
//   const slots = [];

// for (let mins = start; mins < end; mins += duration) {
//   slots.push({ slot: formatTime(mins), status: false });
// }

//   return { slots };
// }
module.exports = Helpers;
