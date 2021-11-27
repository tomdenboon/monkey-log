import { useState, useEffect } from "react";
import { FiLoader, FiPlus, FiMoreVertical } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import FirstHeader from "../components/FirstHeader";

function ExerciseItem({ exercise }) {
  return (
    <li className="flex justify-between w-full p-4 items-center font-semibold rounded-sm shadow bg-gray-50 hover:bg-white ">
      {exercise.name}
      <FiMoreVertical />
    </li>
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
      <FirstHeader
        setShowSidebar={setShowSidebar}
        title="Exercises"
        IconRight={FiPlus}
        linkToRight="exercise/create"
      />
      <div className="px-2 md:px-5 pb-5 pt-4 md:pt-0">
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
