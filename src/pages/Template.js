import React, { useState, useEffect } from "react";
import MonkeyAxios from "../MonkeyAxios";
import { FirstHeader } from "../components/headers";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import BeginWorkoutModal from "../components/BeginWorkoutModal";
import Dropdown from "../components/Dropdown";
import CardContainer from "../components/styled/CardContainer";
import ShadowyContainer from "../components/styled/ShadowyContainer";

function TemplateCard({ template, deleteAt, at, add }) {
  const history = useHistory();
  const axios = MonkeyAxios();

  const toEditTemplate = () => {
    history.push("/dashboard/template/" + template.id + "/edit");
  };

  const deleteTemplate = () => {
    axios.delete("workout/" + template.workout.id).then((res) => {
      deleteAt(at);
    });
  };

  const duplicateTemplate = () => {
    axios.post("template/" + template.id + "/clone").then((res) => {
      add(res.data.data);
    });
  };

  return (
    <div className="group flex w-full flex-col items-start text-left rounded p-4 bg-white cursor-pointer hover:shadow-md transition-all">
      <div className="flex w-full pb-2 text-lg font-semibold items-center justify-between">
        <p className="group-hover:text-blue-500 focus transition">
          {template.workout.name}
        </p>
        <Dropdown
          options={[
            { name: "Edit", func: toEditTemplate },
            { name: "Duplicate", func: duplicateTemplate },
            { name: "Delete", func: deleteTemplate },
          ]}
        />
      </div>
      <ul>
        {template.workout.exercise_groups.map((exercise_group, index) => (
          <li key={index} className="truncate">
            {exercise_group.sets} x {exercise_group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Template(props) {
  const [loading, setLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: "",
    workout: {
      exercise_groups: [],
    },
  });
  const { setShowSidebar } = props;
  const active = useSelector((state) => state.active);
  const axios = MonkeyAxios();

  useEffect(() => {
    axios
      .get("template")
      .then((res) => {
        setTemplateList(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axios]);

  const deleteAt = (index) => {
    let tempArr = [...templateList];
    tempArr.splice(index, 1);
    console.log(tempArr);
    setTemplateList(tempArr);
  };

  const add = (template) => {
    let tempArr = [...templateList];
    tempArr.push(template);
    setTemplateList(tempArr);
  };

  const Header = () => {
    return (
      <FirstHeader
        setShowSidebar={setShowSidebar}
        title="Workout"
        IconRight={FiPlus}
        linkToRight="/dashboard/template/create"
      />
    );
  };

  const startTemplate = (index) => {
    setSelectedTemplate(templateList[index]);
    if (active != null) {
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <ShadowyContainer loading={loading} header={Header}>
      <BeginWorkoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        template={selectedTemplate}
      />
      <CardContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
          {templateList.map((template, index) => (
            <button
              className="flex"
              key={index}
              onClick={() => startTemplate(index)}
            >
              <TemplateCard
                template={template}
                at={index}
                add={add}
                deleteAt={deleteAt}
              />
            </button>
          ))}
        </div>
      </CardContainer>
    </ShadowyContainer>
  );
}

export default Template;
