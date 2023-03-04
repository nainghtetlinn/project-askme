const { Schema, model } = require("mongoose");
const questionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    answer: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = model("Question", questionSchema);
