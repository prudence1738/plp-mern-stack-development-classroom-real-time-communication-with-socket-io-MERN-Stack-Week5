const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Message = require("./models/Message");

const onlineUsers = new Map(); // username → socketId

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("A user connected:", socket.id);

    // Authenticate user from frontend socket.emit("auth", token)
    socket.on("auth", async (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.username = decoded.username;

        // Update user status
        await User.findOneAndUpdate(
          { username: socket.username },
          { isOnline: true, socketId: socket.id }
        );

        onlineUsers.set(socket.username, socket.id);

        // Notify others
        io.emit("online-users", Array.from(onlineUsers.keys()));
      } catch (err) {
        console.log("Invalid token");
      }
    });

    // Receive message
    socket.on("send-message", async (data) => {
      const { text, room } = data;

      // Save message to DB
      const newMsg = await Message.create({
        sender: socket.username,
        text,
        room: room || "global",
      });

      io.to(room || "global").emit("receive-message", newMsg);
    });

    // Typing indicator
    socket.on("typing", (room) => {
      socket.broadcast.to(room || "global").emit("typing", socket.username);
    });

    // Join rooms
    socket.on("join-room", (room) => {
      socket.join(room);
      socket.emit("joined-room", room);
    });

    // Private message
    socket.on("private-message", async ({ toUser, text }) => {
      const receiverSocketId = onlineUsers.get(toUser);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private-message", {
          from: socket.username,
          text,
        });
      }
    });

    // Disconnect
    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.username);

      if (socket.username) {
        await User.findOneAndUpdate(
          { username: socket.username },
          { isOnline: false, socketId: null }
        );
        onlineUsers.delete(socket.username);
      }

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};
