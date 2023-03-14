const express = require("express");
const { body, validationResult } = require("express-validator");
const { register, login, loginToken } = require("../controllers/user");
const router = express.Router();
/* /api/users/token/:token */
router.route("/token/:token").get(loginToken);

router.use(
  [
    body("username")
      .notEmpty()
      .withMessage("Username required.")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long."),
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
  }
);
/* /api/users/register */
router.route("/register").post(register);
/* /api/users/login */
router.route("/login").post(login);

module.exports = router;
