import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";

function ExerciseHeader({ submit }) {
  return (
    <HeaderStyle>
      <div className="flex items-center">
        <Link className="" to="/dashboard/exercise">
          <FiArrowLeft />
        </Link>
        Create exercise
      </div>
      <button className="p-1 font-mono text-base" onClick={submit}>
        SAVE
      </button>
    </HeaderStyle>
  );
}

function CreateExercise(props) {
  const [isWaiting, setIsWaiting] = useState(false);
  const exerciseTypes = [
    {
      id: 1,
      name: "reps | weight",
    },
    {
      id: 2,
      name: "time | weight",
    },
    {
      id: 3,
      name: "reps",
    },
    {
      id: 4,
      name: "time",
    },
  ];
  const history = useHistory();
  const [name, setName] = useState("");
  const axios = MonkeyAxios();

  const createExercise = () => {
    var select = document.getElementById("exercise_type");
    var exercise_type_id = select.options[select.selectedIndex].value;
    axios
      .post("exercise", {
        name: name,
        exercise_type_id: exercise_type_id,
      })
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
    createExercise();
  };

  return (
    <div className="relative flex flex-col w-full h-screen overflow-auto">
      <ExerciseHeader submit={handleSubmit} />
      <NormalContainer>
        {isWaiting ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="p-2 rounded w-full "
              type="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="relative inline-block w-full text-gray-700">
              <select
                className="w-full p-2 text-base bg-white  rounded appearance-none"
                id="exercise_type"
              >
                {exerciseTypes.map((exerciseType) => (
                  <option
                    key={exerciseType.id}
                    value={exerciseType.id}
                    className="bg-white"
                  >
                    {exerciseType.name}
                  </option>
                ))}
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

export default CreateExercise;
