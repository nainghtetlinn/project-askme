require("colors");
require("dotenv").config();
//--------------------------------/
const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const userRoutes = require("./routes/user");
//--------------------------------/
const app = express();
const port = process.env.PORT || 5000;

connectDB(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}.`.cyan.underline);
  });
});
//--------------------------------/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
//--------------------------------/
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/users", userRoutes);
app.use(errorHandler);
