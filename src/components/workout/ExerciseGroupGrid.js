import React, { useState } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import ExerciseGroupCard from "./ExerciseGroupCard";
import { FiPlus, FiX } from "react-icons/fi";
import { useHistory } from "react-router";
import CancelModal from "../CancelModal";
import Section from "../styled/Section";

function ExerciseGroupGrid({ workout_id, exercise_groups, isActive = false }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [exerciseGroups, setExerciseGroups] = useState(exercise_groups);
  const axios = MonkeyAxios();
  const history = useHistory();

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

  const goToAddExercise = () => {
    history.push("add-exercise");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 ">
      <CancelModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        workoutId={workout_id}
      />
      <Section title="exercises">
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
                  isActive={isActive}
                />
              );
            })}
          </div>
        )}
      </Section>
      <Section title="edit">
        <button
          className="flex w-full items-center justify-between px-2 py-1 text-blue-500 mb-2 self-center bg-white rounded"
          type="button"
          onClick={goToAddExercise}
        >
          <p className="p-1">EXERCISE</p>
          <FiPlus className="h-8 w-8 p-1" />
        </button>
        {isActive && (
          <button
            className="flex w-full items-center justify-between px-2 py-1 text-red-500  self-center bg-white rounded"
            type="button"
            onClick={() => setShowCancelModal(true)}
          >
            <p className="p-1">CANCEL</p>
            <FiX className="h-8 w-8 p-1" />
          </button>
        )}
      </Section>
    </div>
  );
}

export default ExerciseGroupGrid;
