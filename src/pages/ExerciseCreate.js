import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";

function ExerciseCreate() {
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
        history.goBack();
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

  function ExerciseHeader() {
    return (
      <HeaderStyle>
        <div className="flex items-center" onClick={history.goBack}>
          <button className="" to="/dashboard/exercise">
            <FiArrowLeft />
          </button>
          Create exercise
        </div>
        <button
          className="p-1 font-mono text-base text-secondary"
          onClick={handleSubmit}
        >
          SAVE
        </button>
      </HeaderStyle>
    );
  }
  return (
    <div className="relative flex flex-col w-full overflow-auto">
      <ExerciseHeader submit={handleSubmit} />
      <NormalContainer>
        {isWaiting ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="p-2 rounded w-full bg-primary-light"
              type="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="relative inline-block w-full ">
              <select
                className="w-full p-2 text-base bg-primary-light rounded appearance-none"
                id="exercise_type"
              >
                {exerciseTypes.map((exerciseType) => (
                  <option
                    key={exerciseType.id}
                    value={exerciseType.id}
                    className="bg-primary-light"
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

export default ExerciseCreate;
