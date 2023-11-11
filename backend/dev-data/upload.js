const mongoose = require("mongoose");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: `${__dirname}/../config.env` });

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB_URL.replace("<password>", DB_PASSWORD);

const users = fs.readFileSync(path.join(__dirname, "./users.json"));

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

const deleteUsers = async () => {
  try {
    await User.deleteMany();
    console.log("Users deleted");
  } catch (err) {
    console.log(err);
  }
};

const uploadUsers = async () => {
  try {
    await User.create(JSON.parse(users));
    console.log("user uploaded");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--delete") {
  deleteUsers();
}

if (process.argv[2] === "--import") {
  uploadUsers();
}
