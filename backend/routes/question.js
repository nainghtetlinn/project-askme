const express = require("express");
const { body, validationResult } = require("express-validator");
const { protect } = require("../middlewares/auth");
const { postQuestion, getQuestions } = require("../controllers/question");
const router = express.Router();

/* /api/questions/:username */
router.route("/:username").post(
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

/* /api/questions */
router.route("/").get(protect, getQuestions);

module.exports = router;
