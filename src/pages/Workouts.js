import { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import { FiPlus, FiLoader } from "react-icons/fi";
import { useHistory } from "react-router";
import Dropdown from "../components/Dropdown";

function WorkoutCard({ template, deleteAt, at, add }) {
  const [workout, setWorkout] = useState(template);
  const history = useHistory();
  const axios = MonkeyAxios();

  useEffect(() => {
    setWorkout(template);
  }, [template]);

  const toEditWorkout = () => {
    history.push("/dashboard/workout/" + workout.id + "/edit");
  };

  const deleteWorkout = () => {
    axios.delete("workout/" + workout.id).then((res) => {
      deleteAt(at);
    });
  };

  const duplicateWorkout = () => {
    axios.post("template/" + workout.id + "/clone").then((res) => {
      add(res.data.data);
    });
  };

  return (
    <div className="group flex w-full flex-col rounded p-5 bg-white cursor-pointer hover:shadow-md transition-all">
      <div className="flex pb-5 text-xl font-bold items-center justify-between">
        <p className="group-hover:text-blue-500 focus transition">
          {workout.name}
        </p>
        <Dropdown
          options={[
            { name: "Edit", func: toEditWorkout },
            { name: "Duplicate", func: duplicateWorkout },
            { name: "Delete", func: deleteWorkout },
          ]}
        />
      </div>
      <ul>
        {workout.exercise_groups.map((exercise_group, index) => (
          <li key={index} className="truncate">
            {exercise_group.sets} x {exercise_group.name}
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
      .get("template")
      .then((res) => {
        setTemplateList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  const deleteAt = (index) => {
    let tempArr = [...templateList];
    tempArr.splice(index, 1);
    console.log(tempArr);
    setTemplateList(tempArr);
  };

  const add = (template) => {
    let tempArr = [...templateList];
    tempArr.push(template);
    setTemplateList(tempArr);
  };

  return (
    <div className="flex flex-col w-full">
      <FirstHeader
        setShowSidebar={setShowSidebar}
        title="Workout"
        IconRight={FiPlus}
        linkToRight="/dashboard/workout/create"
      />
      <div className="px-1 pb-2 pt-2 md:px-5 ">
        {loading ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
            {templateList.map((workoutTemplate, index) => (
              <WorkoutCard
                template={workoutTemplate}
                key={index}
                at={index}
                add={add}
                deleteAt={deleteAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
