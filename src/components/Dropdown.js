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
        className="rounded-full p-1 flex-shrink-0 hover:bg-gray-100"
        type="button"
        onClick={() => setShow(!show)}
      >
        <FiMoreVertical />
      </button>
      <ul
        className={
          (show ? "flex" : "hidden") +
          " absolute rounded bg-gray-700 hover:bg-gray-800 z-10 text-white font-semibold text-sm right-0 w-32"
        }
      >
        {options.map((option, index) => (
          <li
            key={index}
            className="w-full p-2 cursor-pointer"
            onClick={() => {
              option.func();
              setShow(false);
            }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
