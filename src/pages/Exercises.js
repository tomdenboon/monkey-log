import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiCheck, FiPlus, FiSearch } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import HeaderStyle from "../components/headers";
import Dropdown from "../components/Dropdown";
import NormalContainer from "../components/styled/NormalContainer";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Section from "../components/styled/Section";

function Exercises({ isSelectMode = false, workoutId }) {
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
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
      <HeaderStyle>
        <div className="flex items-center">
          {isSelectMode && (
            <button onClick={history.goBack}>
              <FiArrowLeft />
            </button>
          )}
          {isSelectMode ? "Select Exercises" : "Exercises"}
        </div>
        <Link
          to={"/dashboard/exercise/create"}
          className="flex rounded-full text-xl pl-2 h-8 w-8  text-blue-500"
        >
          <FiPlus className="w-full h-full" />
        </Link>
      </HeaderStyle>
    );
  };

  const addExercises = () => {
    setIsSubmit(true);
    let promises = [];
    exerciseList.forEach(function (exercise) {
      if (exercise.selected) {
        promises.push(
          axios.post("workout/" + workoutId + "/exercise_group", {
            exercise_id: exercise.id,
            order: 1,
          })
        );
      }
    });
    Promise.all(promises)
      .then(function (results) {
        let newArr = [];
        results.forEach(function (response) {
          newArr.push(response.data.data);
        });
        history.goBack();
        setIsSubmit(false);
      })
      .catch((err) => {
        setIsSubmit(false);
      });
  };

  const goToExercise = () => {};

  const toggleSelected = (index) => {
    let tempArr = [...exerciseList];
    tempArr[index].selected = !tempArr[index].selected;
    setExerciseList(tempArr);
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
              className="flex py-2 h-12 w-full text-base bg-white rounded-sm pl-8"
              placeholder=""
              autoComplete="off"
              onChange={(e) => changeSearch(e)}
              value={search}
            />
          </div>
        </Section>
        <Section title="exercises">
          {isSelectMode && (
            <button
              className="flex justify-between w-full px-4 py-2 items-center rounded-sm text-blue-500 bg-white mb-4"
              onClick={addExercises}
            >
              <p className="truncate ">ADD TO WORKOUT</p>
              <FiPlus className="h-8 w-8 p-1" />
            </button>
          )}
          <ul className={"flex w-full gap-px flex-col "}>
            {filteredIndexList.map((i, index) => (
              <button
                key={i}
                className={
                  "flex justify-between w-full px-4 py-2 items-center rounded-sm" +
                  (isSelectMode && exerciseList[i].selected
                    ? " bg-blue-500 text-white"
                    : " bg-white")
                }
                onClick={
                  isSelectMode ? () => toggleSelected(i) : () => goToExercise(i)
                }
              >
                <p className="truncate">{exerciseList[i].name}</p>
                {isSelectMode ? (
                  <div className="h-8 w-8 p-1">
                    <FiCheck className="h-full w-full" />
                  </div>
                ) : (
                  <Dropdown
                    options={[
                      { name: "Edit", func: () => toEditExercise(i) },
                      { name: "Delete", func: () => deleteExercise(i, index) },
                    ]}
                  />
                )}
              </button>
            ))}
          </ul>
        </Section>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default Exercises;
