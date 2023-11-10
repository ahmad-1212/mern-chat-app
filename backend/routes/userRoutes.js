const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(authController.singup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.use(authController.protect);
router.route("/getUser").get(authController.getUser);
router.route("/searchUser").get(userController.searchUser);
router.route("/updateUser").patch(userController.updateUser);

module.exports = router;
