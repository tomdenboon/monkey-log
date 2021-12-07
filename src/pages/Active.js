import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FiLoader, FiArrowLeft } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import ExerciseGroupGrid from "../components/workout/ExerciseGroupGrid";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";

function TemplateHeader({ workout_id, workout_name, start_date }) {
  const [workout, setWorkout] = useState({
    id: workout_id,
    name: workout_name,
  });
  const [timer, setTimer] = useState("");
  const axios = MonkeyAxios();

  const postWorkout = () => {
    axios.put("workout/" + workout.id, workout).then((res) => {
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    function toTimer() {
      const started = new Date(start_date);
      started.setTime(
        started.getTime() - started.getTimezoneOffset() * 60 * 1000
      );
      var milliseconds = Date.now() - started.getTime();
      var end_str = "";
      milliseconds = Math.floor(milliseconds / 1000);
      var secs = milliseconds % 60;
      milliseconds = (milliseconds - secs) / 60;
      var mins = milliseconds;

      if (mins < 10) {
        end_str = "0";
      }
      end_str += mins;
      end_str += ":";
      if (secs < 10) {
        end_str += "0";
      }
      end_str += secs;

      setTimer(end_str);
    }
    const intervalId = setInterval(() => {
      toTimer();
    }, 30); // in milliseconds
    return () => clearInterval(intervalId);
  }, [start_date]);

  return (
    <div className="flex flex-col gap-2 items-center w-full bg-white rounded-none md:rounded p-2">
      <input
        className="text-xl font-bold outline-none text-center"
        type="name"
        value={workout.name}
        placeholder="Name"
        onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
        onBlur={() => postWorkout()}
      />
      {timer}
    </div>
  );
}

function Active({ from }) {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState({
    id: null,
    started_at: null,
    workout: {
      id: null,
      name: "",
      exercise_groups: [],
    },
  });
  const history = useHistory();
  const axios = MonkeyAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get("active")
      .then((res) => {
        let active = res.data.data;
        setActive(active);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  const completeActive = () => {
    axios.post("active/complete").then((res) => {
      history.push("/dashboard/history");
    });
  };

  function Header() {
    return (
      <HeaderStyle>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2 items-center">
            <button
              className=" hover:bg-gray-300 rounded-full p-1 text-xl"
              onClick={history.goBack}
            >
              <FiArrowLeft />
            </button>
            Active workout
          </div>
          <button className="rounded-full p-1 text-sm" onClick={completeActive}>
            FINISH
          </button>
        </div>
      </HeaderStyle>
    );
  }

  return (
    <div className={"relative flex flex-col w-full "}>
      <Header />
      {loading ? (
        <div className="flex w-full">
          <FiLoader className="animate-spin-slow m-auto mt-20" />
        </div>
      ) : (
        <NormalContainer>
          <div className="flex flex-col w-full gap-2 md:gap-4">
            <TemplateHeader
              workout_id={active.workout.id}
              workout_name={active.workout.name}
              start_date={active.started_at}
            />
            <ExerciseGroupGrid
              workout_id={active.workout.id}
              exercise_groups={active.workout.exercise_groups}
            />
          </div>
        </NormalContainer>
      )}
    </div>
  );
}

export default Active;