const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//post a new workout
const createWorkout = async (req, res) => {
  const { reps, load, title } = req.body;
  try {
    const workout = await Workout.create({ reps, load, title });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//get all workouts
const getAllWorkouts = async (req, res) => {
  // const { title } = req.body;
  const workoutResult = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workoutResult);
  //   res.status(404).json(error);
};

//get a single workout
const getWorkout = async (req, res) => {
  // const {id} = req.id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout" });
  }
  const singleWorkout = await Workout.findById(id);
  if (!singleWorkout) {
    return res.status(404).json({ message: "No such workout" });
  }
  res.status(200).json(singleWorkout);
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ message: "No such workout" });
  }
  res.status(200).json(workout);
};

//update workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout" });
  }
  const updatedWorkout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!updatedWorkout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(updatedWorkout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
