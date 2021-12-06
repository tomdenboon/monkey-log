import React, { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import { FiLoader } from "react-icons/fi";
import { useHistory } from "react-router";
import Dropdown from "../components/Dropdown";
import CardContainer from "../components/styled/CardContainer";

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
        <p className="group-hover:text-blue-500 focus transition">
          {complete.workout.name}
        </p>
        <Dropdown
          options={[
            { name: "Edit", func: toEditComplete },
            { name: "Delete", func: deleteComplete },
          ]}
        />
      </div>
      <div>{complete.completed_at}</div>
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
        console.log(res.data.data);
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
    console.log(tempArr);
    setCompleteList(tempArr);
  };

  const add = (complete) => {
    let tempArr = [...completeList];
    tempArr.push(complete);
    setCompleteList(tempArr);
  };

  return (
    <div className="flex flex-col w-full">
      <FirstHeader setShowSidebar={setShowSidebar} title="History" />
      <CardContainer>
        {loading ? (
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  flex ">
            <FiLoader className="animate-spin-slow" />
          </div>
        ) : (
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
        )}
      </CardContainer>
    </div>
  );
}

export default History;
