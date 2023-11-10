const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

// Search user function
exports.searchUser = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  // Search user query
  const searchQuery = query
    ? {
        $and: [
          { _id: { $ne: req.user._id } },
          {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } },
            ],
          },
        ],
      }
    : { name: "" };

  const users = await User.find(searchQuery);
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

// Update user
exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email, photo } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      photo,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
