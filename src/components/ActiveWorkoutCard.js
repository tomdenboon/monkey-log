import React from "react";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";

function ActiveWorkoutCard() {
  return (
    <div className="hidden py-8 w-full">
      <Link
        className="hidden absolute flex items-center left-1/2 -translate-x-1/2 bottom-2  w-1/2
        bg-blue-600 rounded-full drop-shadow-2xl filter text-white justify-evenly px-5 py-2"
        to="/dashboard/active"
      >
        <FiActivity className="text-white flex-shrink-0" />
        <div>workout </div>
        <div>timer</div>
      </Link>
    </div>
  );
}

export default ActiveWorkoutCard;
