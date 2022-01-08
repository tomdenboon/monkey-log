import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import MonkeyAxios from "../MonkeyAxios";
import ExerciseGroupGrid from "../components/workout/ExerciseGroupGrid";
import HeaderStyle from "../components/headers";
import NormalContainer from "../components/styled/NormalContainer";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import datesToTimer, { dateStringToDate } from "../util/datesToTimer";
import Section from "../components/styled/Section";

function HistoryFormHeader({
  workout_id,
  workout_name,
  started_at,
  completed_at,
}) {
  const [workout, setWorkout] = useState({
    id: workout_id,
    name: workout_name,
  });
  const axios = MonkeyAxios();

  const postWorkout = () => {
    axios.put("workout/" + workout.id, workout).then((res) => {
      console.log(res.data.data);
    });
  };

  return (
    <div className="flex gap-2 items-center w-full justify-between bg-primary-light rounded-none md:rounded-sm px-2 py-2">
      <input
        className="text-base font-bold outline-none bg-primary-light"
        type="name"
        value={workout.name}
        placeholder="Name"
        onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
        onBlur={() => postWorkout()}
      />
      {datesToTimer(
        dateStringToDate(started_at),
        dateStringToDate(completed_at)
      )}
    </div>
  );
}

function TemplateEdit() {
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState({
    id: null,
    started_at: "",
    completed_at: "",
    workout: {
      id: null,
      name: "",
      exercise_groups: [],
    },
  });
  const history = useHistory();
  const axios = MonkeyAxios();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("complete/" + String(id))
      .then((res) => {
        let com = res.data.data;
        setComplete(com);
        console.log(com);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios, id]);

  function Header() {
    return (
      <HeaderStyle>
        <div className="flex items-center">
          <button
            type="button"
            className=" hover:bg-gray-300 rounded-full p-1 text-xl"
            onClick={history.goBack}
          >
            <FiArrowLeft />
          </button>
          Edit workout
        </div>
      </HeaderStyle>
    );
  }

  return (
    <ShadowyContainer header={Header} loading={loading}>
      <NormalContainer>
        <div className="flex flex-col w-full gap-5">
          <div>
            <Section title="workout">
              <HistoryFormHeader
                workout_id={complete.workout.id}
                workout_name={complete.workout.name}
                started_at={complete.started_at}
                completed_at={complete.completed_at}
              />
            </Section>
          </div>
          <ExerciseGroupGrid
            workout_id={complete.workout.id}
            exercise_groups={complete.workout.exercise_groups}
            isComplete={true}
          />
        </div>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default TemplateEdit;
