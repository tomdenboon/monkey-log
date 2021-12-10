import React, { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import { useHistory } from "react-router";
import Dropdown from "../components/Dropdown";
import CardContainer from "../components/styled/CardContainer";
import datesToTimer from "../util/datesToTimer";
import ShadowyContainer from "../components/styled/ShadowyContainer";

function CompleteCard({ complete, deleteAt, at }) {
  const history = useHistory();
  const axios = MonkeyAxios();

  const toEditComplete = () => {
    history.push("/dashboard/complete/" + complete.id + "/edit");
  };

  const deleteComplete = () => {
    axios.delete("workout/" + complete.workout.id).then((res) => {
      deleteAt(at);
    });
  };

  return (
    <div className="group flex w-full gap-5 flex-col rounded p-5 bg-white cursor-pointer hover:shadow-md transition-all">
      <div className="flex text-xl font-bold items-center justify-between">
        <p className="group-hover:text-blue-500 focus transition truncate">
          {complete.workout.name}
        </p>
        <Dropdown
          options={[
            { name: "Edit", func: toEditComplete },
            { name: "Delete", func: deleteComplete },
          ]}
        />
      </div>
      <div>
        {datesToTimer(
          new Date(complete.started_at),
          new Date(complete.completed_at)
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
      <CardContainer>
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
      </CardContainer>
    </ShadowyContainer>
  );
}

export default History;
