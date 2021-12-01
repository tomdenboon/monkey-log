import { useEffect, useState } from "react";
import { useRef } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import FocusTrap from "focus-trap-react";
import MonkeyAxios from "../../MonkeyAxios";

function ExerciseModal({ showModal, setShowModal, save }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <FocusTrap active={showModal}>
      <div
        className={
          (showModal ? "flex" : "hidden") +
          " fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-5 z-20 md:pl-72"
        }
      >
        <div
          className="flex flex-col w-4/5 bg-white h-2/3 m-auto rounded-lg"
          ref={ref}
        >
          <div className="p-4 border-b text-lg font-bold flex justify-between">
            Select exercises
            <button
              onClick={closeModal}
              className="p-1 rounded-full focus-visible:bg-gray-100 hover:bg-gray-100 outline-none"
            >
              <FiX />
            </button>
          </div>
          <div className="flex flex-col overflow-auto overscroll-contain bg-gray-100">
            <ul className="flex flex-col h-full ">
              {exerciseList.map((exercise, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={
                      (exercise.selected
                        ? "bg-blue-500  text-white"
                        : "bg-white hover:bg-blue-100 focus-visible:bg-blue-100") +
                      " p-2 px-4 cursor-pointer flex justify-between items-center w-full outline-none "
                    }
                    onClick={() => toggleSelected(index)}
                  >
                    <p className="truncate">{exercise.name}</p>
                    <FiCheck
                      className={
                        (exercise.selected ? "visible" : "invisible") +
                        " flex-shrink-0"
                      }
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="flex p-4 border-t text-blue-500 mt-auto"
            type="button"
            onClick={() => save(exerciseList)}
          >
            Add
          </button>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ExerciseModal;
