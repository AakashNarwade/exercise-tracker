const express = require("express");

const router = express.Router();

//GET all the workouts
router.get("/", (req, res) => {
  res.json({ message: "getting all workout " });
});

//GET a single workout
router.get("/:id", (req, res) => {
  res.json({ message: "Getting a single workout" });
});

//POST a new workout
router.post("/", (req, res) => {
  res.json({ message: "Posting a new workout" });
});

//DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ message: "Deleting a single workout" });
});

//UPDATE  a workout
router.patch("/:id", (req, res) => {
  res.json({ message: "Updating a new workout" });
});
module.exports = router;
