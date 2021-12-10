import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import Modal from "./Modal.js";

function WarningModal({
  showModal,
  setShowModal,
  warningText,
  confirmText,
  cancelText,
}) {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="h-14 items-center px-4 text-lg font-bold flex justify-between">
        Select exercises
        <button
          onClick={closeModal}
          className="p-1 rounded-full focus-visible:bg-gray-100 hover:bg-gray-100 outline-none"
        >
          <FiX />
        </button>
      </div>
      <div className="flex flex-col overflow-auto overscroll-contain bg-gray-100"></div>
      <div className="flex items-center w-full mt-auto px-4 h-14 text-blue-500">
        <button className="" type="button">
          Add
        </button>
      </div>
    </Modal>
  );
}

export default WarningModal;
