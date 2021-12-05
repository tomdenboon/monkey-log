import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";

function ExerciseHeader({ submit }) {
  return (
    <div
      className="flex items-center justify-between bg-gray-100 text-blue-500 text-2xl font-bold gap-2 
      sticky md:relative top-0 p-2 py-4 md:p-5"
    >
      <div className="flex items-center">
        <Link
          className=" hover:bg-gray-300 rounded-full p-1 text-xl"
          to="/dashboard/exercise"
        >
          <FiArrowLeft />
        </Link>
        Create exercise
      </div>
      <button className="p-1 font-mono font-normal text-xl" onClick={submit}>
        Save
      </button>
    </div>
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
      <div className="px-2 md:px-5 pb-5 pt-4 md:pt-0">
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
      </div>
    </div>
  );
}

export default CreateExercise;
