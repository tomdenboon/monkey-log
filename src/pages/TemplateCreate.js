import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";

function Header({ submit }) {
  return (
    <HeaderStyle>
      <div className="flex items-center">
        <Link to="/dashboard/workout">
          <FiArrowLeft />
        </Link>
        Create workout
      </div>
      <button className="font-mono text-base text-secondary" onClick={submit}>
        SAVE
      </button>
    </HeaderStyle>
  );
}

function TemplateCreate() {
  const [isWaiting, setIsWaiting] = useState(false);
  const history = useHistory();
  const [workout, setWorkout] = useState({
    name: "",
  });
  const axios = MonkeyAxios();

  const createWorkout = () => {
    axios
      .post("template", workout)
      .then((res) => {
        setIsWaiting(false);
        history.push("/dashboard/workout/" + res.data.data.id + "/edit");
      })
      .catch((err) => {
        console.log("catch");
        setIsWaiting(false);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (workout.name !== "") {
      setIsWaiting(true);
      createWorkout();
    }
  };

  return (
    <div className="relative flex flex-col w-full h-screen overflow-auto">
      <Header submit={handleSubmit} />
      <NormalContainer>
        {isWaiting ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              className="p-2 rounded-md w-full bg-primary-light placeholder-text-lightest"
              type="name"
              value={workout.name}
              placeholder="Name"
              onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
            />
          </form>
        )}
      </NormalContainer>
    </div>
  );
}

export default TemplateCreate;
