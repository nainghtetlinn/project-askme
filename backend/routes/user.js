const express = require("express");
const { body, validationResult } = require("express-validator");
const { protect } = require("../middlewares/auth");
const User = require("../models/user");
const {
  register,
  login,
  loginToken,
  findUser,
} = require("../controllers/user");
const router = express.Router();
/* /api/users/find/:username */
router.route("/find/:username").get(findUser);

/* /api/users/token */
router.route("/token").get(protect, loginToken);

/* /api/users/register */
router.route("/register").post(
  [
    body("username")
      .notEmpty()
      .withMessage("Username required.")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long.")
      .custom((value) => {
        return User.findOne({ username: value }).then((user) => {
          if (user) {
            return Promise.reject("User already exists.");
          }
        });
      }),
    body("password")
      .notEmpty()
      .withMessage("Password required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    next();
  },
  register
);

/* /api/users/login */
router.route("/login").post(
  [
    body("username")
      .notEmpty()
      .withMessage("Username required.")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((user) => {
          if (!user) {
            return Promise.reject("User not found.");
          }
          req.user = user;
        });
      }),
    body("password")
      .notEmpty()
      .withMessage("Password required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    next();
  },
  login
);

module.exports = router;
