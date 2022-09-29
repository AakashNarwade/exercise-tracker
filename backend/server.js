// const dotenv = require("dotenv")
require("dotenv").config();
const express = require("express");

const workoutRoutes = require("./routes/workoutRoutes");

//express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  next();
});

// routes
//get all workouts
app.use("/api/workout", workoutRoutes);

//get a single workout
app.use("/api/workout", workoutRoutes);

//post a workout
app.use("/api/workout", workoutRoutes);

//listen for requests
app.listen(process.env.PORT, ()=>{
console.log("hello world!!!");
})