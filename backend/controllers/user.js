const asyncHandler = require("express-async-handler");
const {
  generateToken,
  hashPassword,
  comparePassword,
} = require("../utils/token");
const User = require("../models/user");

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json({
    username: user.username,
    _id: user._id,
    token: generateToken(user._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const user = req.user;
  const match = await comparePassword(req.body.password, user.password);
  if (match) {
    res.status(200);
    res.json({
      username: user.username,
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const loginToken = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({
    username: user.username,
    _id: user._id,
    token: generateToken(user._id),
  });
});

const findUser = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({ username: user.username });
});

module.exports = { register, login, loginToken, findUser };
