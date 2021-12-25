import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Exercises from "./Exercises";
import MonkeyAxios from "../MonkeyAxios";

function ActiveAddExercise() {
  const { id } = useParams();
  const [workoutId, setWorkoutId] = useState("1");
  const axios = MonkeyAxios();

  useEffect(() => {
    axios.get("active").then((res) => {
      setWorkoutId(res.data.data.workout.id);
    });
  }, [axios, id, setWorkoutId]);

  return <Exercises workoutId={workoutId} isSelectMode={true} />;
}

export default ActiveAddExercise;
