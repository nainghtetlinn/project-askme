const express = require("express");
const { body, validationResult } = require("express-validator");
const { protect } = require("../middlewares/auth");
const { postQuestion, answerQuestion } = require("../controllers/question");
const router = express.Router();

/* /api/questions/:id */
router.route("/:id").post(
  protect,
  [body("answer").notEmpty().withMessage("Answer required.")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    next();
  },
  answerQuestion
);
/* /api/questions/user/:id */
router.route("/user/:id").post(
  [body("question").notEmpty().withMessage("Question required.")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    next();
  },
  postQuestion
);

module.exports = router;
