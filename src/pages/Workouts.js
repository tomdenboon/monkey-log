import { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import FirstHeader from "../components/FirstHeader";
import { Link } from "react-router-dom";
import { FiPlus, FiLoader } from "react-icons/fi";

function WorkoutCard(props) {
  const { workout } = props;
  return (
    <div className="flex w-full  flex-col rounded-sm p-5 bg-white cursor-pointer shadow">
      <div className="flex pb-5 text-xl font-bold items-center justify-between truncate">
        {workout.name}
        <Link to={"/dashboard/workout/" + workout.id + "/edit"}>
          <FiMoreVertical className="hover:text-blue-500 flex-shrink-0" />
        </Link>
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

function Workouts(props) {
  const [loading, setLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const { setShowSidebar } = props;
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("workout_template")
      .then((res) => {
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
      <FirstHeader
        setShowSidebar={setShowSidebar}
        title="Workout"
        IconRight={FiPlus}
        linkToRight="/dashboard/workout/create"
      />
      <div className="px-2 pb-2 pt-2 md:px-5 ">
        {loading ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
            {templateList.map((workoutTemplate, index) => (
              <WorkoutCard workout={workoutTemplate} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
