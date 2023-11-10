const mongoose = require("mongoose");
const Chat = require("./chatModel");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "Sender should be provided"],
    },
    content: {
      type: String,
      required: [true, "Message should be provided!"],
    },
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
      required: [true, "Message should be related to chat!"],
    },
  },
  {
    timestamps: true,
  }
);

// Add latestMessage before saving message to db
messageSchema.pre("save", async function (next) {
  await Chat.findByIdAndUpdate(this.chat, {
    latestMessage: this._id,
  });

  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
