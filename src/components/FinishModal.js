import React from "react";
import Modal from "./Modal.js";
import MonkeyAxios from "../MonkeyAxios.js";
import * as action from "../store/actions";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

function FinishModal({ showModal, setShowModal }) {
  const axios = MonkeyAxios();
  const history = useHistory();
  const dispatch = useDispatch();

  const completeActive = () => {
    axios.post("active/complete").then((res) => {
      dispatch(action.setActiveDate(null));
      history.push("/dashboard/history");
    });
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col w-64 p-4 gap-4">
        <div className="text-lg font-bold ">Finish workout</div>
        All your uncompleted sets will not be saved. Are you sure you want to
        finish?
        <div className="flex items-center w-full text-secondary">
          <button className="text-sm" type="button" onClick={completeActive}>
            FINISH
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default FinishModal;
