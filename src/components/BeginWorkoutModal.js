import React from "react";
import MonkeyAxios from "../MonkeyAxios.js";
import Modal from "./Modal.js";
import { useHistory } from "react-router";

function BeginWorkoutModal({ showModal, setShowModal, template }) {
  const history = useHistory();
  const axios = MonkeyAxios();

  const goToActive = () => {
    if (template.id !== "") {
      axios.post("template/" + template.id + "/start").then((res) => {
        history.push("/dashboard/workout/active");
      });
    } else {
      axios.post("active/start_empty").then((res) => {
        history.push("/dashboard/workout/active");
      });
    }
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col w-64 p-2">
        <div className="text-lg font-bold ">Start workout</div>
        {template.workout.name}
        <ul className="flex flex-col overflow-auto overscroll-contain">
          {template.workout.exercise_groups.map((exercise_group, index) => (
            <li key={index} className="truncate">
              {exercise_group.sets} x {exercise_group.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center w-full text-blue-500">
          <button className="text-sm" type="button" onClick={goToActive}>
            START
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BeginWorkoutModal;
