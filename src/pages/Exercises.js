import { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FiLoader, FiX, FiArrowLeft } from "react-icons/fi";

function ExerciseItem({ exercise }) {
  return (
    <li className="flex justify-between w-full p-4 items-center font-medium rounded-sm shadow-sm bg-gray-50 hover:bg-white ">
      {exercise.name}
      <FiX />
    </li>
  );
}

function ExerciseHeader({ setShowSidebar }) {
  return (
    <div
      className="flex items-center bg-gray-200 text-blue-500 text-2xl md:text-4xl font-bold gap-2 
    sticky top-0 shadow-md md:shadow-none p-2 md:p-5"
    >
      <button
        className="md:hidden hover:bg-gray-300 rounded-full p-1"
        onClick={setShowSidebar}
      >
        <FiArrowLeft />
      </button>
      Exercises
    </div>
  );
}

function Exercises({ setShowSidebar }) {
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState([]);

  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("exercise")
      .then((res) => {
        console.log(res.data);
        setExerciseList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  return (
    <div className="relative flex flex-col w-full h-screen overflow-auto">
      {loading && (
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
          <FiLoader className="animate-spin-slow" />
        </div>
      )}

      <ExerciseHeader setShowSidebar={setShowSidebar} />
      <div className="px-5 pb-5 pt-4 md:pt-0">
        <ul
          className={
            "flex w-full gap-1 flex-col " + (loading ? "invisible" : "visible")
          }
        >
          {exerciseList.map((exercise, index) => (
            <ExerciseItem exercise={exercise} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Exercises;
