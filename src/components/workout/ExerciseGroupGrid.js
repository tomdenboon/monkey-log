import React, { useState } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import ExerciseGroupCard from "./ExerciseGroupCard";
import ExerciseModal from "./ExerciseModal";
import { FiPlus, FiX } from "react-icons/fi";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import * as action from "../../store/actions";

function ExerciseGroupGrid({
  workout_id,
  exercise_groups,
  isTemplate = false,
  isActive = false,
  isComplete = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [exerciseGroups, setExerciseGroups] = useState(exercise_groups);
  const axios = MonkeyAxios();
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteExerciseGroup = (id, i) => {
    axios
      .delete("/exercise_group/" + id)
      .then((res) => {
        let temp = [...exerciseGroups];
        temp.splice(i, 1);
        setExerciseGroups(temp);
      })
      .catch((err) => {});
  };

  const addExerciseGroups = (addExerciseGroups) => {
    setExerciseGroups((exerciseGroups) => [
      ...exerciseGroups,
      ...addExerciseGroups,
    ]);
  };

  const cancelActive = () => {
    axios.delete("workout/" + workout_id).then((res) => {
      dispatch(action.setActiveDate(null));
      history.replace("template");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 ">
      <ExerciseModal
        showModal={showModal}
        setShowModal={setShowModal}
        add={addExerciseGroups}
        workoutId={workout_id}
      />
      {exerciseGroups.length > 0 && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
          {exerciseGroups.map((exercise_group, index) => {
            return (
              <ExerciseGroupCard
                className="w-full bg-gray-50"
                key={index}
                at={index}
                deleteExerciseGroup={deleteExerciseGroup}
                exercise_group={exercise_group}
                isTemplate={isTemplate}
                isComplete={isComplete}
              />
            );
          })}
        </div>
      )}
      <button
        className="flex w-full items-center justify-between pl-2 py-1   self-center bg-white text-blue-500  md:rounded-sm"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <p className="p-1 font-semibold">Exercise</p>
        <FiPlus className="h-8 w-8 p-1" />
      </button>
      {isActive && (
        <button
          className="flex w-full items-center justify-between pl-2 py-1   self-center bg-white text-red-500  md:rounded-sm"
          type="button"
          onClick={() => cancelActive()}
        >
          <p className="p-1 font-semibold">Cancel</p>
          <FiX className="h-8 w-8 p-1" />
        </button>
      )}
    </div>
  );
}

export default ExerciseGroupGrid;
