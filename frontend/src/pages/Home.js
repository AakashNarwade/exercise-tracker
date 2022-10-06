import React, { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const getWorkoutDetails = async () => {
      const response = await fetch("/api/workout");
      const result = await response.json();

      if (response.ok) {
        setWorkouts(result);
      }
    };
    getWorkoutDetails();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout, workout_id) => (
            <WorkoutDetails workout={workout} key={workout_id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
