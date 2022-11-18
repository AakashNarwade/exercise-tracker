// const dotenv = require("dotenv")
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

//express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  next();
});

// workout routes
app.use("/api/workout", workoutRoutes);

//user routes
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db hello world!!!");
    });
  })
  .catch((e) => console.log(e));

//listen for requests
