import React, { useState, useEffect } from "react";
import { FiLoader, FiPlus } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import Dropdown from "../components/Dropdown";
import NormalContainer from "../components/styled/NormalContainer";

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

  const deleteExercise = (index) => {
    axios
      .delete("/exercise/" + exerciseList[index].id)
      .then((res) => {
        const temp = [...exerciseList];
        temp.splice(index, 1);
        setExerciseList(temp);
      })
      .catch((err) => {});
  };

  const toEditExercise = (index) => {};

  return (
    <div className="flex flex-col">
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
      <NormalContainer>
        <ul
          className={
            "flex w-full gap-px flex-col " + (loading ? "invisible" : "visible")
          }
        >
          {exerciseList.map((exercise, index) => (
            <li
              key={index}
              className="flex justify-between w-full p-4 items-center font-semibold rounded-sm bg-white"
            >
              <p className="truncate">{exercise.name}</p>
              <Dropdown
                options={[
                  { name: "Edit", func: () => toEditExercise(index) },
                  { name: "Delete", func: () => deleteExercise(index) },
                ]}
              />
            </li>
          ))}
        </ul>
      </NormalContainer>
    </div>
  );
}

export default Exercises;
