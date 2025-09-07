const mongoose = require("mongoose");
const { Schema } = mongoose;

const SlotSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    startTime: {
      // type: String,
      time: {
        type: Number,
        required: true,
      },
      periodIndicator: {
        type: String,
        enum: ["AM", "PM"],
        required: true,
      },
    },

    endTime: {
      // type: String,
      time: {
        type: Number,
        required: true,
      },
      periodIndicator: {
        type: String,
        enum: ["AM", "PM"],
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },

    slots: [
      {
        slot: {
          type: String,
          required: true,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("slots", SlotSchema);
