const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide your name!"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valide email!"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      minLength: [8, "Password should be at least 8 chars"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide confirm password!"],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "Password should be the same!",
      },
    },
    photo: {
      type: String,
      default: "default-user.jpg",
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // If password is not modified simply return
  if (!this.isModified("password")) return next();

  // Hash password in cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove password confirm field
  this.passwordConfirm = undefined;
  next();
});

// Function to check if password is correct
userSchema.methods.correctPassword = async function (
  enterPassword,
  userPassword
) {
  return await bcrypt.compare(enterPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
