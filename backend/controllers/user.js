const asyncHandler = require("express-async-handler");
const { generateToken, hashPassword } = require("../utils/token");
const User = require("../models/user");

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const u = await User.findOne({ username });
  if (u) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json({
    username,
    token: generateToken(user._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
});

module.exports = { register, login };
