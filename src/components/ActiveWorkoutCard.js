import { FiActivity } from "react-icons/fi";
function ActiveWorkoutCard() {
  return (
    <div className="py-8 w-full">
      <div
        className="flex items-center justify-center absolute left-2 bottom-2 md:left-7 md:bottom-7
        bg-blue-500 hover:bg-blue-700 z-20 rounded-full shadow"
      >
        <FiActivity className="text-white flex-shrink-0 text-xl m-2" />
      </div>
    </div>
  );
}

export default ActiveWorkoutCard;
