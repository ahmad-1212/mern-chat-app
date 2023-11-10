const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isChatGroup: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    photo: {
      type: String,
      default: "/default-user.jpg",
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.pre(/^find/, function (next) {
  this.populate("users").populate("latestMessage").sort({ updatedAt: -1 });
  next();
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
