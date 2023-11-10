const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // eslint-disable-next-line
    console.log("Connection successfull");
  } catch (err) {
    console.log(err);
  }
};

connectDB();

// Create Server

const server = app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log("App running on PORT " + PORT);
});

const io = new Server(server, {
  cors: {
    credentials: true,
  },
  pingTimeout: 60000,
});

const chatNamespace = io.of("/socket");
let onlineUsers = [];

chatNamespace.on("connection", (socket) => {
  socket.on("user-online", (userId) => {
    socket.join(userId);
    // eslint-disable-next-line
    !onlineUsers?.some((user) => user.userId === userId) &&
      onlineUsers.push({ socketId: socket.id, userId });
    chatNamespace.emit("get-online-users", onlineUsers);
  });

  // When a user joins a room
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("left-chat", (chatId) => {
    socket.leave(chatId);
  });

  // Alert user about typing
  socket.on("typing", (roomId, userName) => {
    socket.in(roomId).emit("typing", userName);
  });

  // Alert user about when typing is stopped
  socket.on("stop-typing", (roomId) => {
    socket.in(roomId).emit("stop-typing");
  });

  // Alert other users in a room when message is sent
  socket.on("send-message", (message) => {
    message.chat.users.forEach((user) => {
      if (message.sender._id === user._id) return;

      socket.to(user._id).emit("receive-message", message);
    });
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    chatNamespace.emit("get-online-users", onlineUsers);
  });
});
