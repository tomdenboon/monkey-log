import { useState } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import ExerciseGroupCard from "./ExerciseGroupCard";
import ExerciseModal from "./ExerciseModal";

function ExerciseGroupGrid({ workout_id, exercise_groups }) {
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

  const addExerciseGroups = (exerciseList) => {
    let promises = [];
    exerciseList.forEach(function (exercise) {
      if (exercise.selected) {
        promises.push(
          axios.post("workout/" + workout_id + "/exercise_group", {
            exercise_id: exercise.id,
            order: 1,
          })
        );
      }
    });
    Promise.all(promises).then(function (results) {
      let newArr = [...exerciseGroups];
      results.forEach(function (response) {
        newArr.push(response.data.data);
      });
      setExerciseGroups(newArr);
      setShowModal(false);
    });
  };

  return (
    <div>
      <ExerciseModal
        showModal={showModal}
        setShowModal={setShowModal}
        save={addExerciseGroups}
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
        {exerciseGroups.map((exercise_group, index) => {
          console.log("render");
          return (
            <ExerciseGroupCard
              className="w-full bg-gray-50"
              key={index}
              at={index}
              deleteExerciseGroup={deleteExerciseGroup}
              exercise_group={exercise_group}
            />
          );
        })}
      </div>
      <button type="button" onClick={() => setShowModal(true)}>
        add exercise
      </button>
    </div>
  );
}

export default ExerciseGroupGrid;
