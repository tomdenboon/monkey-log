import React from "react";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";

function ActiveWorkoutCard() {
  return (
    <div className="py-8 w-full">
      <Link
        className="flex items-center justify-center absolute left-1 bottom-1 md:left-7 md:bottom-7
        bg-white w-1/3  z-20 rounded-full shadow-xl"
        to="/dashboard/active"
      >
        <FiActivity className="text-blue-500 flex-shrink-0 text-xl m-3" />
      </Link>
    </div>
  );
}

export default ActiveWorkoutCard;
