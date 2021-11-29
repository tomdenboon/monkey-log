import { useState, useEffect } from "react";
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
    <div ref={ref} className="relative">
      <button
        className="rounded-full p-1 flex-shrink-0 hover:bg-gray-100 focus:bg-gray-100 outline-none"
        type="button"
        onClick={() => setShow(!show)}
      >
        <FiMoreVertical />
      </button>
      <ul
        className={
          (show ? "flex" : "hidden") +
          " flex flex-col absolute rounded bg-gray-700 z-10 text-sm text-white right-0 w-32 overflow-hidden"
        }
      >
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => {
                option.func();
                setShow(false);
              }}
              type="button"
              className="w-full hover:bg-gray-800 text-left p-2 cursor-pointer outline-none focus-visible:bg-gray-800"
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
