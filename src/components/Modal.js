import React, { useEffect } from "react";
import { useRef } from "react";
import FocusTrap from "focus-trap-react";

function Modal({ showModal, setShowModal, children }) {
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    const handleEsc = (event) => {
      if (event.keyCode === 27) setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowModal]);

  return (
    <FocusTrap active={showModal}>
      <div
        className={
          (showModal ? "flex" : "hidden") +
          " fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-20 z-40 md:pl-72"
        }
      >
        <div
          className="relative flex bg-primary-light m-auto rounded-lg"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}

export default Modal;
