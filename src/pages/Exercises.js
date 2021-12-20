import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import Dropdown from "../components/Dropdown";
import NormalContainer from "../components/styled/NormalContainer";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import { useHistory } from "react-router";
import Section from "../components/styled/Section";

function Exercises({ setShowSidebar }) {
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredIndexList, setFilteredIndexList] = useState([]);
  const history = useHistory();
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("exercise")
      .then((res) => {
        let temp = [];
        for (const exercise of res.data.data) {
          temp.push({ ...exercise, selected: false });
        }
        setExerciseList(temp);
        setFilteredIndexList(temp.map((e, index) => index));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios]);

  const deleteExercise = (index, filterIndex) => {
    axios
      .delete("/exercise/" + exerciseList[index].id)
      .then((res) => {
        const newFilt = [...filteredIndexList];
        newFilt.splice(filterIndex, 1);
        for (let j = filterIndex; j < newFilt.length; j++) {
          newFilt[j] -= 1;
        }
        setFilteredIndexList(newFilt);
        const temp = [...exerciseList];
        temp.splice(index, 1);
        setExerciseList(temp);
      })
      .catch((err) => {});
  };

  const toEditExercise = (index) => {
    history.push("/dashboard/exercise/" + exerciseList[index].id + "/edit");
  };

  const changeSearch = (e) => {
    setSearch(e.target.value);

    const newFiltered = [];
    for (let i = 0; i < exerciseList.length; i++) {
      if (
        exerciseList[i].name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        newFiltered.push(i);
      }
    }
    setFilteredIndexList(newFiltered);
  };

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
        <Section title="search">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FiSearch className="w-5 h-5" />
            </span>
            <input
              type="search"
              name="q"
              className="flex py-2 w-full text-base bg-white rounded-md pl-8"
              placeholder=""
              autoComplete="off"
              onChange={(e) => changeSearch(e)}
              value={search}
            />
          </div>
        </Section>
        <Section title="exercises">
          <ul className={"flex w-full gap-px flex-col "}>
            {filteredIndexList.map((i, index) => (
              <li
                key={i}
                className="flex justify-between w-full px-4 py-2 items-center rounded-sm bg-white"
              >
                <p className="truncate">{exerciseList[i].name}</p>
                <Dropdown
                  options={[
                    { name: "Edit", func: () => toEditExercise(i) },
                    { name: "Delete", func: () => deleteExercise(i, index) },
                  ]}
                />
              </li>
            ))}
          </ul>
        </Section>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default Exercises;
