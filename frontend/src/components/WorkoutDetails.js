import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

//fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { title, reps, load, createdAt, _id } = workout;
  const handleDelete = async () => {
    const response = await fetch(`/api/workout/${_id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>load(in kgs): </strong>
        {load}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
