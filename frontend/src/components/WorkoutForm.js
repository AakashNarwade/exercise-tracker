import React, { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
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
    }
    if (response.ok) {
      setLoad("");
      setReps("");
      setTitle("");
      setError(null);
      console.log("new workout added");
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
        />
        <label>Load:</label>
        <input
          type="number"
          value={load}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
        />
        <label>Reps</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
          }}
        />
        <button>Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
