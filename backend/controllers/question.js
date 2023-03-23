const asyncHandler = require("express-async-handler");
const Question = require("../models/question");
const User = require("../models/user");

const postQuestion = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  const question = await Question.create({
    title: req.body.question,
    userId: user._id,
  });
  user.questions.push(question._id);
  user.save();
  res.status(200).json({ title: question.title });
});

const getQuestions = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  const questions = await Question.find({ userId: user._id });
  res.status(200).json(questions);
});

module.exports = { postQuestion, getQuestions };
