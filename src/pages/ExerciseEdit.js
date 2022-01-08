import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";
import { useParams } from "react-router";

function ExerciseHeader({ submit }) {
  return (
    <HeaderStyle>
      <div className="flex items-center">
        <Link to="/dashboard/exercise">
          <FiArrowLeft />
        </Link>
        Edit exercise
      </div>
      <button className="p-1 font-mono text-base" onClick={submit}>
        SAVE
      </button>
    </HeaderStyle>
  );
}

function ExerciseEdit() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [exercise, setExercise] = useState({});
  const axios = MonkeyAxios();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("exercise/" + String(id))
      .then((res) => {
        let e = res.data.data;
        setExercise(e);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios, id]);

  const updateExercise = () => {
    axios
      .put("exercise/" + String(id), exercise)
      .then((res) => {
        setIsWaiting(false);
        history.push("/dashboard/exercise");
      })
      .catch((err) => {
        setIsWaiting(false);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsWaiting(true);
    updateExercise();
  };

  return (
    <div className="relative flex flex-col w-full overflow-auto">
      <ExerciseHeader submit={handleSubmit} />
      <NormalContainer>
        {isWaiting || isLoading ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="p-2 rounded-lg w-full bg-primary-light"
              type="name"
              value={exercise.name}
              placeholder="Exercise name..."
              onChange={(e) =>
                setExercise({
                  ...exercise,
                  name: e.target.value,
                })
              }
            />
            <div className="relative inline-block w-full">
              <select
                className="w-full p-2 text-base bg-primary-light  rounded-lg appearance-none"
                id="exercise_type"
                disabled={true}
              >
                <option>{exercise.exercise_type_name}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiChevronDown />
              </div>
            </div>
          </form>
        )}
      </NormalContainer>
    </div>
  );
}

export default ExerciseEdit;
