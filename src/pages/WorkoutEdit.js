import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import ExerciseGroupGrid from "../components/workout/ExerciseGroupGrid";
import HeaderStyle from "../components/headers";

function WorkoutFormInput({ workout_id, workout_name }) {
  const [workout, setWorkout] = useState({
    id: workout_id,
    name: workout_name,
  });
  const axios = MonkeyAxios();

  const postWorkout = () => {
    axios.put("workout/" + workout.id, workout).then((res) => {
      console.log(res.data.data);
    });
  };

  return (
    <input
      className="text-xl font-bold outline-none flex bg-gray-200"
      type="name"
      value={workout.name}
      placeholder="Name"
      onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
      onBlur={() => postWorkout()}
    />
  );
}

function WorkoutEdit() {
  const [loading, setLoading] = useState(true);
  const [exerciseGroups, setExerciseGroups] = useState([]);
  const [workout, setWorkout] = useState({
    id: null,
    name: "",
  });

  const axios = MonkeyAxios();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("workout/" + String(id))
      .then((res) => {
        let newWorkout = res.data.data;
        setWorkout({
          id: newWorkout.id,
          name: newWorkout.name,
        });
        setExerciseGroups(newWorkout.exercise_groups);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios, id]);

  function Header() {
    return (
      <HeaderStyle>
        <div className="flex items-center">
          <Link
            className=" hover:bg-gray-300 rounded-full p-1 text-xl"
            to="/dashboard/workout"
          >
            <FiArrowLeft />
          </Link>
          Edit workout
        </div>
      </HeaderStyle>
    );
  }

  return (
    <div className={"relative flex flex-col w-full h-screen overflow-auto "}>
      <Header />
      {loading ? (
        <div className="flex w-full">
          <FiLoader className="animate-spin-slow m-auto mt-20" />
        </div>
      ) : (
        <div className="px-2 md:px-5 pb-5 pt-4 md:pt-0">
          <div className="flex flex-col w-full gap-5">
            <WorkoutFormInput
              workout_id={workout.id}
              workout_name={workout.name}
            />
            <ExerciseGroupGrid
              workout_id={id}
              exercise_groups={exerciseGroups}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutEdit;
