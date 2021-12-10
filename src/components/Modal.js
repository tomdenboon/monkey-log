import React, { useEffect } from "react";
import { useRef } from "react";
import FocusTrap from "focus-trap-react";

function Modal({ showModal, setShowModal, children }) {
  const ref = useRef();
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

  return (
    <FocusTrap active={showModal}>
      <div
        className={
          (showModal ? "flex" : "hidden") +
          " fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-20 z-30 md:pl-72"
        }
      >
        <div
          className="relative flex flex-col bg-white m-auto rounded-lg"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}

export default Modal;
