const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create message in DB function
exports.createMessage = catchAsync(async (req, res, next) => {
  const { content, chatId } = req.body;

  const newMessage = await Message.create({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });
  let message;
  message = await newMessage.populate("chat");
  message = await newMessage.populate("sender", "name email");

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

// Get all messages of single chat
exports.getAllMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new AppError("No chat is found with id", 400));
  }

  // Checking if chat is related to currently logged in user

  const { users } = chat;
  const isChatRelated = users.some((usr) => usr.id === req.user.id);
  if (!isChatRelated) {
    return next(new AppError("No messages found for this ID for you", 400));
  }

  const allMessages = await Message.find({
    chat: chatId,
  })
    .sort({ updatedAt: 1 })
    .populate("sender", "photo email");

  res.status(200).json({
    status: "success",
    data: {
      messages: allMessages,
    },
  });
});
