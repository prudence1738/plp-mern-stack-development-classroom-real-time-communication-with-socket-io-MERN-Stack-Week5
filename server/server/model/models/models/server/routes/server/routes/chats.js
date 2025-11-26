const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages (global chat)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// GET messages by room
router.get("/room/:room", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room messages" });
  }
});

module.exports = router;
