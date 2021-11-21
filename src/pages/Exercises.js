import { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FiLoader, FiX } from "react-icons/fi";

function ExerciseItem({ exercise }) {
  return (
    <li className="flex justify-between w-full p-4 items-center rounded bg-gray-50 hover:bg-white">
      {exercise.name}
      <FiX />
    </li>
  );
}

function Exercises() {
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState([]);

  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("weightedExercise")
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
    <div className="relative flex flex-col w-full h-screen overflow-auto p-10">
      {loading && (
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
          <FiLoader className="animate-spin-slow" />
        </div>
      )}

      <div className="text-blue-500 text-4xl font-bold pb-5 relative">
        Exercises
      </div>
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
  );
}

export default Exercises;
