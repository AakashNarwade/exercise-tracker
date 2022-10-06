// const dotenv = require("dotenv")
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workoutRoutes");

//express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  next();
});

// routes
app.use("/api/workout", workoutRoutes);

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
