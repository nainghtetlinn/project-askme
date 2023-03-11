require("colors");
require("dotenv").config();
//--------------------------------/
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
//--------------------------------/
const app = express();
const port = process.env.PORT || 5000;

connectDB(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}.`.cyan.underline);
  });
});
//--------------------------------/
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
//--------------------------------/
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use(errorHandler);
