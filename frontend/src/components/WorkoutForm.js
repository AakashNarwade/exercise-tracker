import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState();
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useWorkoutsContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
      setEmptyFields(result.emptyFields);
    }
    if (response.ok) {
      setLoad("");
      setReps("");
      setTitle("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: result });
    }
  };

  return (
    <div className="created">
      <h2>Workout Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Exercise Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load:</label>
        <input
          type="number"
          value={load}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
          }}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
