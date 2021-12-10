import React, { useState } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import ExerciseGroupCard from "./ExerciseGroupCard";
import ExerciseModal from "./ExerciseModal";
import { FiPlus } from "react-icons/fi";

function ExerciseGroupGrid({ workout_id, exercise_groups, isTemplate }) {
  const [showModal, setShowModal] = useState(false);
  const [exerciseGroups, setExerciseGroups] = useState(exercise_groups);
  const axios = MonkeyAxios();

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

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-4 ">
      <ExerciseModal
        showModal={showModal}
        setShowModal={setShowModal}
        add={addExerciseGroups}
        workoutId={workout_id}
      />
      {exerciseGroups.length > 0 && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-4 gap-2">
          {exerciseGroups.map((exercise_group, index) => {
            return (
              <ExerciseGroupCard
                className="w-full bg-gray-50"
                key={index}
                at={index}
                deleteExerciseGroup={deleteExerciseGroup}
                exercise_group={exercise_group}
                isTemplate={isTemplate}
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
    </div>
  );
}

export default ExerciseGroupGrid;
