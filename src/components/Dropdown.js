import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";

function Dropdown({ options }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShow]);

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={(e) => setShow(!show)}>
        <FiMoreVertical className="w-full h-full flex-shrink-0" />
      </button>
      <ul
        className={
          (show ? "flex" : "hidden") +
          " flex flex-col absolute rounded bg-gray-800 z-20 text-sm text-white right-0 w-32 overflow-hidden"
        }
      >
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={(e) => {
                option.func();
                setShow(false);
              }}
              type="button"
              className="w-full hover:bg-gray-900 text-left p-2 cursor-pointer outline-none focus-visible:bg-gray-900"
            >
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
