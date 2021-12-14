import React, { useState } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import { FiX, FiCheck } from "react-icons/fi";

const makeNewExercisable = (exerciseRow) => {
  const exercisable = {};
  for (let key in exerciseRow.exercisable) {
    if (exerciseRow.is_lifted) {
      exercisable[key] = exerciseRow.exercisable[key];
    } else {
      exercisable[key] = "";
    }
  }
  return exercisable;
};

function ExerciseRow({ exercise_row, deleteItem, index, isActive }) {
  const [exerciseRow, setExerciseRow] = useState(exercise_row);
  const [newExercisable, setNewExercisable] = useState(
    makeNewExercisable(exerciseRow)
  );
  const axios = MonkeyAxios();

  const submitNewValues = () => {
    const newExerciseRow = { ...exerciseRow };
    for (const key in newExercisable) {
      if (newExercisable[key] === "") {
        newExerciseRow.exercisable[key] = exerciseRow.exercisable[key];
      } else {
        newExerciseRow.exercisable[key] = newExercisable[key];
      }
    }
    setExerciseRow(newExerciseRow);
    axios.put("exercise_row/" + exerciseRow.id, newExerciseRow).then((res) => {
      console.log(res.data.data);
    });
  };

  const toggleLifted = () => {
    const newExerciseRow = { ...exerciseRow };
    newExerciseRow.is_lifted = !newExerciseRow.is_lifted;
    setNewExercisable(makeNewExercisable(newExerciseRow));
    setExerciseRow(newExerciseRow);

    axios.put("exercise_row/" + exerciseRow.id, newExerciseRow).then((res) => {
      console.log(res.data.data);
    });
  };

  const handleExerciseChange = (e) => {
    const { value, name } = e.target;
    let exercisable = newExercisable;
    exercisable = { ...exercisable, [name]: value };
    setNewExercisable(exercisable);
  };

  return (
    <li
      key={index}
      className={
        "flex w-full gap-4 p-2 items-center " +
        (exerciseRow.is_lifted ? "bg-green-100" : "bg-white")
      }
    >
      <button
        type="button"
        className="h-8 w-8 text-blue-500 outline-none flex-shrink-0 font-semibold focus-visible:bg-blue-200 hover:bg-blue-200 "
      >
        {index + 1}
      </button>
      {Object.keys(exerciseRow.exercisable).map((key, index) => (
        <input
          className={
            "w-full outline-none text-center box-border border-b pt-px " +
            (exerciseRow.is_lifted
              ? "bg-green-100 border-green-100"
              : " border-gray-200")
          }
          key={index}
          name={key}
          autoComplete="off"
          value={newExercisable[key]}
          placeholder={exerciseRow.exercisable[key]}
          onChange={(e) => handleExerciseChange(e)}
          onBlur={() => submitNewValues()}
        />
      ))}
      <button
        className={
          "h-8 w-8  outline-none flex-shrink-0 font-semibold  p-1 focus-visible:bg-green-200 " +
          (!isActive
            ? "text-gray-300 pointer-events-none"
            : "text-green-500 hover:bg-green-200")
        }
        type="button"
        disabled={!isActive}
        onClick={toggleLifted}
      >
        <FiCheck className="h-full w-full" />
      </button>
      <button
        className="h-8 w-8 text-red-500 outline-none flex-shrink-0 font-semibold  p-1 focus-visible:bg-red-200 hover:bg-red-200 "
        type="button"
        onClick={() => deleteItem(index, exerciseRow)}
      >
        <FiX className="h-full w-full text-red-500" />
      </button>
    </li>
  );
}

export default ExerciseRow;
