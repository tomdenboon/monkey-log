import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FiPlus, FiCheck, FiLoader, FiSearch } from "react-icons/fi";
import FocusTrap from "focus-trap-react";
import MonkeyAxios from "../../MonkeyAxios";

function ExerciseModal({ showModal, setShowModal, workoutId, add }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [filteredIndexList, setFilteredIndexList] = useState([]);
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const ref = useRef();
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios]);

  useEffect(() => {
    if (!showModal) {
      let tempArr = [...exerciseList];
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].selected = false;
      }
      setExerciseList(tempArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowModal]);

  const toggleSelected = (index) => {
    let tempArr = [...exerciseList];
    tempArr[index].selected = !tempArr[index].selected;
    setExerciseList(tempArr);
  };

  const addExercises = (exerciseList) => {
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
        add(newArr);
        setIsSubmit(false);
        setShowModal(false);
      })
      .catch((err) => {
        setIsSubmit(false);
      });
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

  return (
    <FocusTrap active={showModal}>
      <div
        className={
          (showModal ? "flex" : "hidden") +
          " fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-20 z-30 md:pl-72"
        }
      >
        <div
          className="relative flex flex-col w-4/5 bg-white h-2/3 m-auto rounded-lg"
          ref={ref}
        >
          <div className="p-4 flex gap-2 flex-col border-b ">
            <div className="items-center text-lg font-bold flex justify-between">
              Exercises
              <FiPlus className="w-6 h-6 text-blue-500" />
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FiSearch className="w-5 h-5" />
              </span>
              <input
                type="search"
                name="q"
                className="flex py-1 w-full text-base bg-gray-200 rounded-md pl-8"
                placeholder="Search..."
                autoComplete="off"
                onChange={(e) => changeSearch(e)}
                value={search}
              />
            </div>
          </div>
          <div className="flex flex-col overflow-auto overscroll-contain">
            <ul className="flex flex-col h-full ">
              {filteredIndexList.map((i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={
                      (exerciseList[i].selected
                        ? "bg-blue-500  text-white"
                        : "bg-white hover:bg-blue-100 focus-visible:bg-blue-100") +
                      " p-2 px-4 cursor-pointer flex justify-between items-center w-full outline-none "
                    }
                    onClick={() => toggleSelected(i)}
                  >
                    <p className="truncate">{exerciseList[i].name}</p>
                    <FiCheck
                      className={
                        (exerciseList[i].selected ? "visible" : "invisible") +
                        " flex-shrink-0"
                      }
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex font-mono items-center w-full mt-auto border-t px-4 py-4 text-blue-500">
            {isSubmit ? (
              <FiLoader className="animate-spin-slow" />
            ) : (
              <button
                className=""
                type="button"
                onClick={() => addExercises(exerciseList)}
              >
                SAVE
              </button>
            )}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ExerciseModal;
