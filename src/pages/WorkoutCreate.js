import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import HeaderStyle from "../components/headers";

function Header({ submit }) {
  return (
    <HeaderStyle>
      <div className="flex items-center">
        <Link
          className=" hover:bg-gray-300 rounded-full p-1"
          to="/dashboard/workout"
        >
          <FiArrowLeft />
        </Link>
        Create workout
      </div>
      <button className=" font-normal text-xl" onClick={submit}>
        Save
      </button>
    </HeaderStyle>
  );
}

function WorkoutCreate() {
  const [isWaiting, setIsWaiting] = useState(false);
  const history = useHistory();
  const [workout, setWorkout] = useState({
    name: "",
    is_template: true,
  });
  const axios = MonkeyAxios();

  const createWorkout = () => {
    axios
      .post("workout", workout)
      .then((res) => {
        setIsWaiting(false);
        console.log("here");

        history.push("/dashboard/workout/" + res.data.data.id + "/edit");
      })
      .catch((err) => {
        console.log("catch");
        setIsWaiting(false);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsWaiting(true);
    createWorkout();
  };

  return (
    <div className="relative flex flex-col w-full h-screen overflow-auto">
      <Header submit={handleSubmit} />
      <div className="px-2 md:px-5 pb-5 pt-4 md:pt-0">
        {isWaiting ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className="p-2 rounded-md border outline-none w-full "
              type="name"
              value={workout.name}
              placeholder="Name"
              onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default WorkoutCreate;
