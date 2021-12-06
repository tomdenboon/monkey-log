import React, { useState, useEffect } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import Dropdown from "../Dropdown";
import { FiX, FiPlus, FiCheck } from "react-icons/fi";

function ExerciseGroupCard({ exercise_group, deleteExerciseGroup, at }) {
  const [exerciseGroup, setExerciseGroup] = useState(exercise_group);
  const axios = MonkeyAxios();

  useEffect(() => {
    setExerciseGroup(exercise_group);
  }, [exercise_group]);

  const handleExerciseChange = (e, index) => {
    const { value, name } = e.target;
    let exercise = exerciseGroup.weighted_exercises[index];
    exercise = { ...exercise, [name]: value };
    exerciseGroup.weighted_exercises[index] = exercise;
    setExerciseGroup({
      ...exerciseGroup,
      weighted_exercises: exerciseGroup.weighted_exercises,
    });
  };

  const submitNewExercise = (evt) => {
    evt.preventDefault();
    const newExercise =
      exerciseGroup.weighted_exercises[
        exerciseGroup.weighted_exercises.length - 1
      ];
    axios
      .post("exercise_group/" + exerciseGroup.id + "/weighted_exercise", {
        reps: newExercise.reps,
        weight: newExercise.weight,
        order: newExercise.order,
      })
      .then((res) => {
        exerciseGroup.weighted_exercises.push(res.data.data);
        setExerciseGroup({
          ...exerciseGroup,
          weighted_exercises: exerciseGroup.weighted_exercises,
        });
      })
      .catch((err) => {});
  };

  const changeExercise = (evt, exercise) => {
    evt.preventDefault();
    axios
      .put("/weighted_exercise/" + exercise.id, {
        reps: exercise.reps,
        weight: exercise.weight,
        order: exercise.order,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  const deleteExercise = (exercise, index) => {
    if (exerciseGroup.weighted_exercises.length <= 1) {
      deleteThis();
    } else {
      axios
        .delete("/weighted_exercise/" + exercise.id)
        .then((res) => {
          exerciseGroup.weighted_exercises.splice(index, 1);
          setExerciseGroup({
            ...exerciseGroup,
            weighted_exercises: exerciseGroup.weighted_exercises,
          });
        })
        .catch((err) => {});
    }
  };

  const deleteThis = () => {
    deleteExerciseGroup(exerciseGroup.id, at);
  };

  return (
    <div className="flex w-full flex-col rounded-none md:rounded-md bg-white">
      <div className="flex font-bold items-center justify-between pt-4 px-2">
        <p className="truncate">{exerciseGroup.name}</p>

        <Dropdown options={[{ name: "Delete", func: deleteThis }]} />
      </div>
      <ul className="h-full flex flex-col ">
        <li className="flex w-full gap-1">
          <div className="h-8 w-8 flex-shrink-0" />
          <div className="flex items-end justify-center w-full outline-none text-sm text-center text-gray-500">
            reps
          </div>
          <div className="flex items-end justify-center w-full outline-none text-sm text-center text-gray-500">
            kg
          </div>
          <div className="h-8 w-8 flex-shrink-0" />
          <div className="h-8 w-8 flex-shrink-0" />
        </li>
        {exerciseGroup.weighted_exercises.map((weighted_exercise, index) => (
          <li key={index} className="flex w-full gap-1 py-1">
            <button
              type="button"
              className="h-8 w-8 text-blue-500 outline-none flex-shrink-0 font-semibold focus:bg-gray-100 hover:bg-gray-100 border-gray-200"
            >
              {index + 1}
            </button>
            <input
              className="w-full rounded outline-none border border-gray-200 text-center"
              name="reps"
              value={weighted_exercise.reps}
              onChange={(e) => handleExerciseChange(e, index)}
              onBlur={(e) => changeExercise(e, weighted_exercise)}
            />
            <input
              className="w-full rounded outline-none border border-gray-200 text-center"
              name="weight"
              value={weighted_exercise.weight}
              onChange={(e) => handleExerciseChange(e, index)}
              onBlur={(e) => changeExercise(e, weighted_exercise)}
            />
            <button
              className="h-8 w-8 p-1 flex-shrink-0 outline-none focus:bg-gray-100 hover:bg-gray-100 border-gray-200 text-green-500"
              type="button"
            >
              <FiCheck className="h-full w-full" />
            </button>
            <button
              className="h-8 w-8 p-1   flex-shrink-0 outline-none focus:bg-gray-100 hover:bg-gray-100 border-gray-200"
              type="button"
              onClick={() => deleteExercise(weighted_exercise, index)}
            >
              <FiX className="h-full w-full text-red-500" />
            </button>
          </li>
        ))}
        <li className="flex w-full mt-auto gap-1 justify-center items-center pt-1 pb-4 px-4">
          <button
            type="button"
            className="h-8 w-8 p-1 flex-shrink-0"
            onClick={submitNewExercise}
          >
            <FiPlus className="h-full w-full text-blue-500" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ExerciseGroupCard;
