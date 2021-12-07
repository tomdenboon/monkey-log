import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
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
  const history = useHistory();
  const [name, setName] = useState("");
  const axios = MonkeyAxios();

  const createExercise = () => {
    axios
      .post("exercise", {
        name: name,
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
          <form onSubmit={handleSubmit}>
            <input
              className="p-2 rounded-md border outline-none w-full "
              type="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        )}
      </NormalContainer>
    </div>
  );
}

export default CreateExercise;
