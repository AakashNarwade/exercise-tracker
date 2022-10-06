import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    // console.log(workouts, "workouts   ");
    const getWorkoutDetails = async () => {
      const response = await fetch("/api/workout");
      const result = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: result });
      }
    };
    getWorkoutDetails();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
