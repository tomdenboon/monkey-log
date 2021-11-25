import { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FiMoreVertical, FiArrowLeft } from "react-icons/fi";

function WorkoutCard(props) {
  const { workout } = props;
  return (
    <div className="flex w-full  flex-col rounded-sm p-5 bg-gray-50 hover:bg-white cursor-pointer shadow">
      <div className="flex pb-5 text-xl font-bold items-center justify-between truncate">
        {workout.name}
        <FiMoreVertical className="hover:text-blue-500 flex-shrink-0" />
      </div>
      <ul>
        {workout.exercise_groups.map((exercise_group, index) => (
          <li key={index} className="truncate">
            {exercise_group.sets} sets of {exercise_group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkoutHeader({ setShowSidebar }) {
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
      Workout
    </div>
  );
}

function Workouts(props) {
  const [loading, setLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const { setShowSidebar } = props;
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("workout_template")
      .then((res) => {
        console.log(res.data.data);
        setTemplateList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);
  return (
    <div className="relative flex flex-col w-full h-screen overflow-auto">
      <WorkoutHeader setShowSidebar={setShowSidebar} />
      <div className="px-5 pb-5 pt-4 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {templateList.map((workoutTemplate, index) => (
            <WorkoutCard workout={workoutTemplate} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
