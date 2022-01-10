import React, { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import { useHistory } from "react-router";
import Dropdown from "../components/Dropdown";
import datesToTimer, { dateStringToDate } from "../util/datesToTimer";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import NormalContainer from "../components/styled/NormalContainer";

function CompleteCard({ complete, deleteAt, at }) {
  const history = useHistory();
  const axios = MonkeyAxios();

  const toEditComplete = () => {
    history.push("/dashboard/history/" + complete.id + "/edit");
  };

  const deleteComplete = () => {
    axios.delete("workout/" + complete.workout.id).then((res) => {
      deleteAt(at);
    });
  };

  const completeToTemplate = () => {
    axios
      .post("workout/" + complete.workout.id + "/to-template")
      .then((res) => {
        history.push("/dashboard/workout/" + res.data.data.id + "/edit");
      });
  };

  const date = () => {
    return dateStringToDate(complete.started_at).toLocaleDateString();
  };

  return (
    <div
      className="group flex w-full gap-5 flex-col rounded p-5 bg-primary-light cursor-pointer hover:shadow-md transition-all"
      onClick={toEditComplete}
    >
      <div className="flex text-lg font-bold justify-between">
        <div>
          <p className="group-hover:text-secondary focus transition truncate">
            {complete.workout.name}
          </p>
          <div className="text-sm font-medium text-text-light">{date()}</div>
        </div>
        <Dropdown
          options={[
            { name: "Edit", func: toEditComplete },
            { name: "To Template", func: completeToTemplate },
            { name: "Delete", func: deleteComplete },
          ]}
        />
      </div>
      <div className="flex">
        Duration:{" "}
        {datesToTimer(
          dateStringToDate(complete.started_at),
          dateStringToDate(complete.completed_at)
        )}
      </div>
      <ul>
        {complete.workout.exercise_groups.map((exercise_group, index) => (
          <li key={index} className="truncate">
            {exercise_group.sets} x {exercise_group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function History(props) {
  const [loading, setLoading] = useState(true);
  const [completeList, setCompleteList] = useState([]);
  const { setShowSidebar } = props;
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("complete")
      .then((res) => {
        setCompleteList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  const deleteAt = (index) => {
    let tempArr = [...completeList];
    tempArr.splice(index, 1);
    setCompleteList(tempArr);
  };

  const add = (complete) => {
    let tempArr = [...completeList];
    tempArr.push(complete);
    setCompleteList(tempArr);
  };

  const Header = () => {
    return <FirstHeader setShowSidebar={setShowSidebar} title="History" />;
  };

  return (
    <ShadowyContainer header={Header} loading={loading}>
      <NormalContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
          {completeList.map((complete, index) => (
            <CompleteCard
              complete={complete}
              key={index}
              at={index}
              add={add}
              deleteAt={deleteAt}
            />
          ))}
        </div>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default History;
