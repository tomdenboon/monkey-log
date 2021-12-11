import React, { useState, useEffect } from "react";
import MonkeyAxios from "../../MonkeyAxios";
import Dropdown from "../Dropdown";
import { FiX, FiPlus, FiCheck } from "react-icons/fi";

function WeightedExerciseGroupRow({
  exercise,
  deleteItem,
  index,
  isTemplate,
  isComplete,
}) {
  const [weightedExercise, setWeightedExercise] = useState(exercise);
  const [newWeightedExercise, setNewWeightedExercise] = useState({
    reps: "",
    weight: "",
  });
  const axios = MonkeyAxios();

  useEffect(() => {
    if (exercise.is_lifted) {
      setNewWeightedExercise({
        reps: exercise.reps,
        weight: exercise.weight,
      });
    }
  }, [exercise]);

  const updateReps = (evt) => {
    evt.preventDefault();
    if (newWeightedExercise.reps !== "") {
      axios
        .put("/weighted_exercise/" + weightedExercise.id, {
          reps: newWeightedExercise.reps,
        })
        .then((res) => {
          setWeightedExercise(res.data.data);
          console.log(res);
        })
        .catch((err) => {});
    }
  };

  const updateWeight = (evt) => {
    evt.preventDefault();
    if (newWeightedExercise.weight !== "") {
      axios
        .put("/weighted_exercise/" + weightedExercise.id, {
          weight: newWeightedExercise.weight,
        })
        .then((res) => {
          setWeightedExercise(res.data.data);
          console.log(res);
        })
        .catch((err) => {});
    }
  };

  const handleExerciseChange = (e) => {
    const { value, name } = e.target;
    let exercise = newWeightedExercise;
    exercise = { ...exercise, [name]: value };
    setNewWeightedExercise(exercise);
  };

  const toggleLifted = () => {
    setWeightedExercise({
      ...weightedExercise,
      is_lifted: !weightedExercise.is_lifted,
    });
    if (weightedExercise.is_lifted) {
      setNewWeightedExercise({
        reps: "",
        weight: "",
      });
    } else {
      setNewWeightedExercise({
        reps: weightedExercise.reps,
        weight: weightedExercise.weight,
      });
    }
    axios.put("/weighted_exercise/" + weightedExercise.id, {
      is_lifted: !weightedExercise.is_lifted,
    });
  };

  return (
    <li
      key={index}
      className={
        "flex w-full gap-4 h-8 " +
        (weightedExercise.is_lifted ? "bg-green-100" : "bg-white")
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
          "w-full outline-none text-center box-border border-b pt-px " +
          (weightedExercise.is_lifted
            ? "bg-green-100 border-green-100"
            : " border-gray-200")
        }
        name="reps"
        value={newWeightedExercise.reps}
        placeholder={weightedExercise.reps}
        onChange={(e) => handleExerciseChange(e)}
        onBlur={(e) => updateReps(e)}
      />
      <input
        className={
          "w-full outline-none text-center box-border border-b pt-px " +
          (weightedExercise.is_lifted
            ? "bg-green-100 border-green-100"
            : " border-gray-200")
        }
        name="weight"
        value={newWeightedExercise.weight}
        placeholder={weightedExercise.weight}
        onChange={(e) => handleExerciseChange(e)}
        onBlur={(e) => updateWeight(e)}
      />
      <button
        className={
          "h-8 w-8  outline-none flex-shrink-0 font-semibold  p-1 focus-visible:bg-green-200 " +
          (isTemplate || isComplete
            ? "text-gray-300 pointer-events-none"
            : "text-green-500 hover:bg-green-200")
        }
        type="button"
        disabled={isTemplate || isComplete}
        onClick={() => toggleLifted()}
      >
        <FiCheck className="h-full w-full" />
      </button>
      <button
        className="h-8 w-8 text-red-500 outline-none flex-shrink-0 font-semibold  p-1 focus-visible:bg-red-200 hover:bg-red-200 "
        type="button"
        onClick={() => deleteItem(index, weightedExercise)}
      >
        <FiX className="h-full w-full text-red-500" />
      </button>
    </li>
  );
}

function ExerciseGroupCard({
  exercise_group,
  deleteExerciseGroup,
  at,
  isTemplate,
  isComplete,
}) {
  const [exerciseGroup, setExerciseGroup] = useState(exercise_group);
  const axios = MonkeyAxios();

  useEffect(() => {
    setExerciseGroup(exercise_group);
  }, [exercise_group]);

  const submitNewExercise = (evt) => {
    evt.preventDefault();
    axios
      .post("exercise_group/" + exerciseGroup.id + "/weighted_exercise", {
        reps: 0,
        weight: 0,
        order: 1,
      })
      .then((res) => {
        console.log(res.data.data);
        exerciseGroup.weighted_exercises.push(res.data.data);
        setExerciseGroup({
          ...exerciseGroup,
          weighted_exercises: exerciseGroup.weighted_exercises,
        });
      })
      .catch((err) => {});
  };

  const deleteExerciseFromGroup = (index, exercise) => {
    if (exerciseGroup.weighted_exercises.length <= 1) {
      deleteThis();
    } else {
      exerciseGroup.weighted_exercises.splice(index, 1);
      setExerciseGroup({
        ...exerciseGroup,
        weighted_exercises: exerciseGroup.weighted_exercises,
      });
      axios.delete("/weighted_exercise/" + exercise.id);
    }
  };

  const deleteThis = () => {
    deleteExerciseGroup(exerciseGroup.id, at);
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
          <div className="flex items-end justify-center w-full outline-none text-xs text-center text-gray-500 font-mono">
            REPS
          </div>
          <div className="flex items-end justify-center w-full outline-none text-xs text-center text-gray-500 font-mono">
            KG
          </div>
          <div className="h-8 w-8 flex-shrink-0" />
          <div className="h-8 w-8 flex-shrink-0" />
        </li>
        {exerciseGroup.weighted_exercises.map((weighted_exercise, index) => (
          <WeightedExerciseGroupRow
            key={weighted_exercise.id}
            exercise={weighted_exercise}
            deleteItem={deleteExerciseFromGroup}
            index={index}
            isTemplate={isTemplate}
            isComplete={isComplete}
          />
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
