import React from "react";
import Modal from "./Modal.js";
import { getThemes } from "../themes/utils";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions";

function ThemeModal({ showModal, setShowModal }) {
  const selectedTheme = useSelector((state) => state.theme);
  const themes = getThemes();
  const dispatch = useDispatch();

  const setTheme = (theme) => {
    dispatch(action.setTheme(theme));
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col w-64 gap-px">
        {themes.map((theme, index) => {
          return (
            <button
              key={index}
              className={
                (selectedTheme.name === theme.name &&
                  "text-primary-light bg-secondary") + " py-2"
              }
              onClick={() => setTheme(theme)}
            >
              {theme.name}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

export default ThemeModal;
