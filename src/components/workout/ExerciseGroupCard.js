import React, { useState, useEffect } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import Dropdown from "../Dropdown";
import { FiPlus } from "react-icons/fi";
import ExerciseRow from "./ExerciseRow";

function ExerciseGroupCard({
  exercise_group,
  deleteExerciseGroup,
  at,
  isActive,
}) {
  const [exerciseGroup, setExerciseGroup] = useState(exercise_group);

  const axios = MonkeyAxios();

  useEffect(() => {
    setExerciseGroup(exercise_group);
  }, [exercise_group]);

  const submitNewExercise = (evt) => {
    evt.preventDefault();
    axios
      .post("exercise_group/" + exerciseGroup.id + "/copy_last_row")
      .then((res) => {
        console.log(res.data.data);
        exerciseGroup.exercise_rows.push(res.data.data);
        setExerciseGroup({
          ...exerciseGroup,
          exercise_rows: exerciseGroup.exercise_rows,
        });
      })
      .catch((err) => {});
  };

  const deleteExerciseFromGroup = (index, exercise_row) => {
    if (exerciseGroup.exercise_rows.length <= 1) {
      deleteThis();
    } else {
      exerciseGroup.exercise_rows.splice(index, 1);
      setExerciseGroup({
        ...exerciseGroup,
        exercise_rows: exerciseGroup.exercise_rows,
      });
      axios.delete("/exercise_row/" + exercise_row.id);
    }
  };

  const deleteThis = () => {
    deleteExerciseGroup(exerciseGroup.id, at);
  };

  return (
    <div className="flex w-full flex-col rounded py-4 bg-white">
      <div className="flex items-center justify-between pl-3 pr-2 text-blue-500">
        <p className="truncate font-semibold">{exerciseGroup.name}</p>

        <Dropdown options={[{ name: "Delete", func: deleteThis }]} />
      </div>
      <ul className="h-full flex flex-col ">
        <li className="flex w-full px-2 pt-2 gap-2 text-xs text-center font-mono text-gray-400 ">
          <div className="flex justify-center h-8 w-8 flex-shrink-0 items-center">
            SET
          </div>
          {Object.keys(exerciseGroup.exercise_rows[0].exercisable).map(
            (key, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full outline-none"
              >
                {key.toLocaleUpperCase()}
              </div>
            )
          )}
          <div className="h-8 w-8 flex-shrink-0" />
          <div className="h-8 w-8 flex-shrink-0" />
        </li>
        {exerciseGroup.exercise_rows.map((exercise_row, index) => (
          <ExerciseRow
            key={exercise_row.id}
            exercise_row={exercise_row}
            deleteItem={deleteExerciseFromGroup}
            index={index}
            isActive={isActive}
          />
        ))}
        <li className="flex p-2 w-full justify-center items-center">
          <button
            type="button"
            className="flex w-full justify-between text-blue-500  "
            onClick={submitNewExercise}
          >
            <div className="h-8 w-8 p-1 font-semibold ">
              {exerciseGroup.exercise_rows.length + 1}
            </div>
            <FiPlus className="h-8 w-8 p-1" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ExerciseGroupCard;
