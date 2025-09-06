const Helpers = {
     parseTime: (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (period.toLowerCase() === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes; // total minutes
  },

    formatTime: (minutes) => {
    let hrs = Math.floor(minutes / 60);
    let mins = minutes % 60;
    const period = hrs >= 12 ? "PM" : "AM";

    if (hrs === 0) hrs = 12; // midnight
    else if (hrs > 12) hrs -= 12;

    return ${hrs}:${String(mins).padStart(2, "0")} ${period};
  }
}

function generateSlots({ startTime, endTime, duration }) {
  
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const slots = [];

  for (let mins = start; mins < end; mins += duration) {
    slots.push({ slot: formatTime(mins), status: false });
  }

  return { slots };
}