import React from "react";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";

function ActiveWorkoutCard() {
  return (
    <div className="py-8 w-full">
      <Link
        className="flex items-center justify-center absolute left-2 bottom-2 md:left-7 md:bottom-7
        bg-blue-500 hover:bg-blue-700 z-20 rounded-full shadow"
        to="/dashboard/active"
      >
        <FiActivity className="text-white flex-shrink-0 text-xl m-3" />
      </Link>
    </div>
  );
}

export default ActiveWorkoutCard;
