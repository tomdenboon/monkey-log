import React, { useState } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import { FiCheck } from "react-icons/fi";
import Dropdown from "../Dropdown";

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
        "flex w-full gap-2 p-2 items-center bg-split-white-green gradient bg-200% transition-all duration-300 " +
        (exerciseRow.is_lifted ? "bg-left" : "bg-right")
      }
    >
      <button
        type="button"
        className="h-8 w-8 text-blue-500 rounded-lg outline-none flex-shrink-0 font-semibold focus-visible:bg-blue-200 hover:bg-blue-200 "
      >
        {index + 1}
      </button>
      {Object.keys(exerciseRow.exercisable).map((key, index) => (
        <input
          className={
            "w-full h-full outline-none text-center box-border border rounded-lg pt-px bg-transparent transition-all duration-300  " +
            (exerciseRow.is_lifted
              ? " border-transparent "
              : " border-gray-200")
          }
          inputMode="numeric"
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
          "h-8 w-8  flex-shrink-0 font-semibold p-1 rounded-lg " +
          (!isActive
            ? "text-gray-400 pointer-events-none"
            : exerciseRow.is_lifted
            ? "text-white  hover:bg-green-500 bg-green-400"
            : "text-green-500 hover:bg-green-200 ")
        }
        type="button"
        disabled={!isActive}
        onClick={toggleLifted}
      >
        <FiCheck className="h-full w-full" />
      </button>
      <Dropdown
        options={[
          { name: "Delete", func: () => deleteItem(index, exerciseRow) },
        ]}
      />
    </li>
  );
}

export default ExerciseRow;
