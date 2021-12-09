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

  const toggleLifted = (index) => {
    const new_weighted_exercises = exerciseGroup.weighted_exercises;
    new_weighted_exercises[index].is_lifted =
      !new_weighted_exercises[index].is_lifted;
    setExerciseGroup({
      ...exerciseGroup,
      weighted_exercises: new_weighted_exercises,
    });
  };

  return (
    <div className="flex w-full flex-col rounded-none md:rounded-sm py-4 bg-white">
      <div className="flex items-center justify-between px-2">
        <p className="truncate text-blue-500 font-semibold">
          {exerciseGroup.name}
        </p>

        <Dropdown options={[{ name: "Delete", func: deleteThis }]} />
      </div>
      <ul className="h-full flex flex-col ">
        <li className="flex w-full gap-4">
          <div className="h-8 w-8 flex-shrink-0" />
          <div className="flex items-end justify-center w-full outline-none text-sm text-center text-gray-500 font-mono">
            REPS
          </div>
          <div className="flex items-end justify-center w-full outline-none text-sm text-center text-gray-500 font-mono">
            KG
          </div>
          <div className="h-8 w-8 flex-shrink-0" />
          <div className="h-8 w-8 flex-shrink-0" />
        </li>
        {exerciseGroup.weighted_exercises.map((weighted_exercise, index) => (
          <li
            key={index}
            className={
              "flex w-full gap-4 h-8 " +
              (weighted_exercise.is_lifted ? "bg-green-100" : "bg-white")
            }
          >
            <button
              type="button"
              className="h-8 w-8 text-blue-500 outline-none flex-shrink-0 font-semibold focus-visible:bg-blue-200 hover:bg-blue-200 "
            >
              {index + 1}
            </button>
            <input
              className={
                "w-full outline-none text-center box-border border-b " +
                (weighted_exercise.is_lifted
                  ? "bg-green-100 border-green-100"
                  : " border-gray-200")
              }
              name="reps"
              value=""
              placeholder={weighted_exercise.reps}
              onChange={(e) => handleExerciseChange(e, index)}
              onBlur={(e) => changeExercise(e, weighted_exercise)}
            />
            <input
              className={
                "w-full outline-none text-center box-border border-b " +
                (weighted_exercise.is_lifted
                  ? "bg-green-100 border-green-100"
                  : " border-gray-200")
              }
              name="weight"
              value=""
              placeholder={weighted_exercise.weight}
              onChange={(e) => handleExerciseChange(e, index)}
              onBlur={(e) => changeExercise(e, weighted_exercise)}
            />
            <button
              className="h-8 w-8 text-green-500 outline-none flex-shrink-0 font-semibold  p-1 focus-visible:bg-green-200 hover:bg-green-200"
              type="button"
              onClick={() => toggleLifted(index)}
            >
              <FiCheck className="h-full w-full" />
            </button>
            <button
              className="h-8 w-8 text-red-500 outline-none flex-shrink-0 font-semibold  p-1 focus-visible:bg-red-200 hover:bg-red-200 "
              type="button"
              onClick={() => deleteExercise(weighted_exercise, index)}
            >
              <FiX className="h-full w-full text-red-500" />
            </button>
          </li>
        ))}
        <li className="flex w-full justify-center items-center hover:bg-gray-100">
          <button
            type="button"
            className="flex w-full justify-between text-blue-500 "
            onClick={submitNewExercise}
          >
            <div className="h-8 w-8 p-1 font-semibold">
              {exerciseGroup.weighted_exercises.length + 1}
            </div>
            <FiPlus className="h-8 w-8 p-1" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ExerciseGroupCard;
