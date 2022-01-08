import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import MonkeyAxios from "../MonkeyAxios";
import ExerciseGroupGrid from "../components/workout/ExerciseGroupGrid";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";
import datesToTimer, { dateStringToDate } from "../util/datesToTimer";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import Section from "../components/styled/Section";
import FinishModal from "../components/FinishModal";

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
      const started = dateStringToDate(start_date);
      started.setTime(
        started.getTime() - started.getTimezoneOffset() * 60 * 1000
      );
      var end_str = datesToTimer(started, new Date());
      setTimer(end_str);
    }
    const intervalId = setInterval(() => {
      toTimer();
    }, 30); // in milliseconds
    return () => clearInterval(intervalId);
  }, [start_date]);

  return (
    <div className="flex gap-2 items-center w-full justify-between bg-primary-light rounded h-10 px-3">
      <input
        className="text-base font-bold outline-none bg-primary-light"
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

function Active() {
  const [showModal, setShowModal] = useState(false);
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
  const dispatch = useDispatch();
  const history = useHistory();
  const axios = MonkeyAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get("active")
      .then((res) => {
        let active = res.data.data;
        dispatch(action.setActiveDate(active.started_at));
        setActive(active);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(action.setActiveDate(null));
        console.log(err);
        history.goBack();
      });
  }, [axios, history, dispatch]);

  function Header() {
    return (
      <HeaderStyle>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2 items-center ">
            <button className="text-lg" onClick={history.goBack}>
              <FiArrowLeft />
            </button>
            Active workout
          </div>
          <button
            className="rounded-full pl-1 text-base text-secondary"
            onClick={() => setShowModal(true)}
          >
            FINISH
          </button>
        </div>
      </HeaderStyle>
    );
  }

  return (
    <ShadowyContainer header={Header} loading={loading}>
      <FinishModal showModal={showModal} setShowModal={setShowModal} />
      <NormalContainer>
        <div className="flex flex-col w-full gap-5">
          <Section title="workout">
            <TemplateHeader
              workout_id={active.workout.id}
              workout_name={active.workout.name}
              start_date={active.started_at}
            />
          </Section>
          <ExerciseGroupGrid
            workout_id={active.workout.id}
            exercise_groups={active.workout.exercise_groups}
            isActive={true}
          />
        </div>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default Active;
