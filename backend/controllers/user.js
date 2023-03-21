const asyncHandler = require("express-async-handler");
const {
  generateToken,
  decodeToken,
  hashPassword,
  comparePassword,
} = require("../utils/token");
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
    _id: user._id,
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
  const match = await comparePassword(password, user.password);
  if (match) {
    res.status(200);
    res.json({
      username,
      _id: user._id,
      questions: user.questions,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const loginToken = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const { id } = decodeToken(token);
  const user = await User.findById(id);
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
  user = req.query.user;
  const userProfile = await User.findOne({ username: user });
  if (!userProfile) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({ username: userProfile.username });
});

module.exports = { register, login, loginToken, findUser };
