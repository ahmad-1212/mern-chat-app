const express = require("express");

const chatController = require("../controllers/chatController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(chatController.getAllChats);
router.route("/:userId").get(chatController.getSingleChat);

router.route("/singleChat/:chatId").get(chatController.getChatWithId);

router.route("/createGroupChat").post(chatController.createGroupChat);

router.route("/removeGroupChatUser").patch(chatController.removeGroupUser);

module.exports = router;
