import { useEffect, useState, useLayoutEffect } from "react";
import { useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiPlus, FiCheck, FiX } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import Dropdown from "../components/Dropdown";

function Header() {
  return (
    <div
      className="flex items-center justify-between bg-gray-100 text-blue-500 text-2xl font-bold gap-2 
      sticky md:relative top-0 p-2 py-4 md:p-5 z-20"
    >
      <div className="flex items-center">
        <Link
          className=" hover:bg-gray-300 rounded-full p-1 text-xl"
          to="/dashboard/workout"
        >
          <FiArrowLeft />
        </Link>
        Edit workout
      </div>
    </div>
  );
}

function ExerciseGroupCard({ exercise_group, deleteExerciseGroup, at }) {
  const [exerciseGroup, setExerciseGroup] = useState(exercise_group);
  const [newExercise, setNewExercise] = useState({
    reps: "",
    weight: "",
    order: 1,
  });
  const axios = MonkeyAxios();

  useLayoutEffect(() => {
    setExerciseGroup(exercise_group);
  }, [exercise_group]);

  const handleNewExerciseChange = (e) => {
    const { value, name } = e.target;
    setNewExercise({ ...newExercise, [name]: value });
  };

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
  };

  const deleteThis = () => {
    deleteExerciseGroup(exerciseGroup.id, at);
  };

  return (
    <div className="flex w-full flex-col rounded-sm bg-white shadow">
      <div className="flex font-bold items-center justify-between pt-4 px-4">
        {exerciseGroup.name}
        <Dropdown options={[{ name: "Delete", func: deleteThis }]} />
      </div>
      <ul className="flex flex-col ">
        <li className="flex w-full items-end px-4 gap-1 text-xs text-center text-gray-400">
          <div className="w-1/2">reps</div>
          <div className="w-1/2">kg</div>
          <button
            disabled
            className="h-full w-8 pointer-events-none"
            type="button"
          >
            <FiCheck className="h-full w-full text-white" />
          </button>
          <button
            className="h-full w-8 pointer-events-none "
            type="button"
            disabled
          >
            <FiCheck className="h-full w-full text-white" />
          </button>
        </li>
        {exerciseGroup.weighted_exercises.map((weighted_exercise, index) => (
          <li key={index} draggable className="flex w-full gap-1 py-1 px-4">
            <input
              className="w-1/2 rounded outline-none border border-gray-200 text-center"
              name="reps"
              value={weighted_exercise.reps}
              onChange={(e) => handleExerciseChange(e, index)}
              onBlur={(e) => changeExercise(e, weighted_exercise)}
            />
            <input
              className="w-1/2 rounded outline-none border border-gray-200 text-center "
              name="weight"
              value={weighted_exercise.weight}
              onChange={(e) => handleExerciseChange(e, index)}
              onBlur={(e) => changeExercise(e, weighted_exercise)}
            />
            <button
              className="h-full w-8 outline-none focus:bg-gray-100 hover:bg-gray-100 rounded border border-gray-200 text-green-500"
              type="button"
            >
              <FiCheck className="h-full w-full" />
            </button>
            <button
              className="h-full w-8 outline-none focus:bg-gray-100 hover:bg-gray-100 rounded border border-gray-200"
              type="button"
              onClick={() => deleteExercise(weighted_exercise, index)}
            >
              <FiX className="h-full w-full text-red-500" />
            </button>
          </li>
        ))}
        <li className="flex w-full gap-1 pt-1 pb-4 px-4 ">
          <input
            className="w-1/2 rounded outline-none border  border-gray-200 text-center"
            value={newExercise.reps}
            name="reps"
            onChange={handleNewExerciseChange}
          />
          <input
            className="w-1/2 rounded outline-none border  border-gray-200 text-center "
            value={newExercise.weight}
            name="weight"
            onChange={handleNewExerciseChange}
          />
          <button
            type="button"
            onClick={submitNewExercise}
            className="h-full w-8 outline-none focus:bg-gray-100 hover:bg-gray-100 rounded border border-gray-200"
          >
            <FiPlus className="h-full w-full text-blue-500" />
          </button>
          <button
            type="button"
            disabled
            className="h-full w-8  pointer-events-none"
          ></button>
        </li>
      </ul>
    </div>
  );
}

function AddExerciseModal({ showModal, setShowModal }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("exercise")
      .then((res) => {
        setExerciseList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowModal]);

  return (
    <div
      className={
        (showModal ? "flex" : "hidden") +
        " fixed left-0 top-0 h-full w-full  bg-black bg-opacity-5 z-20"
      }
    >
      <div
        className="flex flex-col w-4/5 bg-white h-2/3 m-auto rounded-lg"
        ref={ref}
      >
        <div className="p-4 border-b text-lg font-bold">Add exercises</div>
        <div className="flex flex-col overflow-auto bg-gray-100">
          <ul className="flex flex-col h-full ">
            {exerciseList.map((exercise, index) => (
              <li
                key={index}
                className="p-2 px-4 bg-white hover:bg-gray-50 cursor-pointer"
              >
                {exercise.name}
              </li>
            ))}
          </ul>
        </div>
        <button className="flex p-4 border-t text-blue-500">Save</button>
      </div>
    </div>
  );
}

function WorkoutEdit() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [workout, setWorkout] = useState({
    name: "",
    exercise_groups: [],
  });
  const axios = MonkeyAxios();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("workout/" + String(id))
      .then((res) => {
        setWorkout(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios, id]);

  const deleteExerciseGroup = (id, i) => {
    axios
      .delete("/exercise_group/" + id)
      .then((res) => {
        workout.exercise_groups.splice(i, 1);
        setWorkout({
          ...workout,
          exercise_groups: workout.exercise_groups,
        });
      })
      .catch((err) => {});
  };

  return (
    <div
      className={
        "relative flex flex-col w-full h-screen overflow-auto " +
        (showModal ? "overflow-hidden" : "overflow-auto")
      }
    >
      <Header />
      <AddExerciseModal showModal={showModal} setShowModal={setShowModal} />
      {loading ? (
        <div className="flex w-full">
          <FiLoader className="animate-spin-slow m-auto mt-20" />
        </div>
      ) : (
        <div className="px-2 md:px-5 pb-5 pt-4 md:pt-0">
          <form className="flex flex-col w-full gap-5">
            <input
              className="text-xl font-bold outline-none flex bg-gray-100"
              type="name"
              value={workout.name}
              placeholder="Name"
              onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
            />
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
              {workout.exercise_groups.map((exercise_group, index) => {
                console.log(exercise_group);
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
          </form>
        </div>
      )}
    </div>
  );
}

export default WorkoutEdit;
