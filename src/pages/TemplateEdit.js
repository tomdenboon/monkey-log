import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import ExerciseGroupGrid from "../components/workout/ExerciseGroupGrid";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";

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

function TemplateEdit() {
  const [loading, setLoading] = useState(true);
  const [workout, setWorkout] = useState({
    id: null,
    name: "",
    exercise_groups: [],
  });

  const axios = MonkeyAxios();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("template/" + String(id))
      .then((res) => {
        let template = res.data.data;
        setWorkout(template.workout);
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
            to="/dashboard/template"
          >
            <FiArrowLeft />
          </Link>
          Edit workout
        </div>
      </HeaderStyle>
    );
  }

  return (
    <div className={"relative flex flex-col w-full "}>
      <Header />
      {loading ? (
        <div className="flex w-full">
          <FiLoader className="animate-spin-slow m-auto mt-20" />
        </div>
      ) : (
        <NormalContainer>
          <div className="flex flex-col w-full gap-2 md:gap-4">
            <WorkoutFormInput
              workout_id={workout.id}
              workout_name={workout.name}
            />
            <ExerciseGroupGrid
              workout_id={workout.id}
              exercise_groups={workout.exercise_groups}
            />
          </div>
        </NormalContainer>
      )}
    </div>
  );
}

export default TemplateEdit;