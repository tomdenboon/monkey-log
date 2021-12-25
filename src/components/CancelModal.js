import React from "react";
import Modal from "./Modal.js";
import MonkeyAxios from "../MonkeyAxios.js";
import * as action from "../store/actions";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

function CancelModal({ showModal, setShowModal, workoutId }) {
  const axios = MonkeyAxios();
  const history = useHistory();
  const dispatch = useDispatch();

  const cancelActive = () => {
    axios.delete("workout/" + workoutId).then((res) => {
      dispatch(action.setActiveDate(null));
      history.replace("/dashboard/workout");
    });
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col w-64 p-4 gap-4">
        <div className="text-lg font-bold ">Cancel workout</div>
        Are you sure you want to cancel your workout?
        <div className="flex items-center w-full text-blue-500">
          <button className="text-sm" type="button" onClick={cancelActive}>
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CancelModal;
