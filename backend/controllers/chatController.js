const Chat = require("../models/chatModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get all chats for authenticated user
exports.getAllChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  });
  res.status(200).json({
    status: "success",
    data: {
      chats,
    },
  });
});

// Get single chat
exports.getSingleChat = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  // Get Chat if it exists already
  const isChat = await Chat.findOne({
    isChatGroup: false,
    $and: [
      {
        users: { $elemMatch: { $eq: userId } },
      },
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
    ],
  });

  // If chat already exists send it or else create a new chat and send it to user
  if (isChat) {
    res.status(200).json({
      status: "success",
      data: {
        chat: isChat,
      },
    });
  } else {
    const createdChat = await Chat.create({
      chatName: "sender",
      isChatGroup: false,
      users: [req.user._id, userId],
    });

    const chat = await Chat.findOne({ _id: createdChat._id });

    res.status(201).json({
      status: "success",
      data: {
        chat,
      },
    });
  }
});

// Get single chat with chat id
exports.getChatWithId = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.chatId);

  if (!chat) {
    return next(new AppError("No chat found with that id", 400));
  }

  // Checking if the chat is related to currently logged in user
  const { users } = chat;
  const isChatRelated = users.some((usr) => usr.id === req.user.id);

  if (!isChatRelated) {
    return next(new AppError("No chat found with this ID for you!", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      chat,
    },
  });
});

exports.createGroupChat = catchAsync(async (req, res, next) => {
  const { chatName, users, photo } = req.body;

  const usersArr = JSON.parse(users);
  usersArr.push(req.user._id);

  // If users length are less than 3 return an error
  if (users.length < 3) {
    return next(
      new AppError("There must be atleast three users to creat group!", 400)
    );
  }

  const chat = await Chat.create({
    isChatGroup: true,
    chatName,
    users: usersArr,
    groupAdmin: req.user._id,
    photo,
  });

  res.status(201).json({
    status: "success",
    data: {
      chat,
    },
  });
});

// Delete user from group
exports.removeGroupUser = catchAsync(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new AppError("No chat found with ID", 400));
  }

  // find if the group admin is the user who request to remove
  if (String(req.user._id) !== String(chat.groupAdmin)) {
    return next(
      new AppError(
        "Only group admin are allowed to remove user from group!",
        403
      )
    );
  }

  // If chat users are less than 2 delete complete chat
  if (chat.users.length < 3) {
    await Chat.findByIdAndDelete(chatId);
  }

  // if chat users are greater than 2 remove the user
  if (chat.users.length > 2) {
    await Chat.findByIdAndUpdate(chatId, {
      $pull: { users: userId },
    });
  }

  res.status(203).json({
    status: "success",
    data: {
      message: "user successfully removed from the group!",
    },
  });
});
