const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
};
const comparePassword = async (pw, hp) => {
  return await bcrypt.compare(pw, hp);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, decodeToken, hashPassword, comparePassword };
