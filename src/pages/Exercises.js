import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import Dropdown from "../components/Dropdown";
import NormalContainer from "../components/styled/NormalContainer";
import ShadowyContainer from "../components/styled/ShadowyContainer";

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

  const header = () => {
    return (
      <FirstHeader
        setShowSidebar={setShowSidebar}
        title="Exercises"
        IconRight={FiPlus}
        linkToRight="exercise/create"
      />
    );
  };

  return (
    <ShadowyContainer header={header} loading={loading}>
      <NormalContainer>
        <ul className={"flex w-full gap-px flex-col "}>
          {exerciseList.map((exercise, index) => (
            <li
              key={index}
              className="flex justify-between w-full px-4 py-3 items-center rounded-sm bg-white"
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
    </ShadowyContainer>
  );
}

export default Exercises;
