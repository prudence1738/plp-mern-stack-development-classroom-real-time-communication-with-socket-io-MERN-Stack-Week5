const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      default: "global",
    },
    text: {
      type: String,
      required: true,
    },
    readBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
