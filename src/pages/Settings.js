import React from "react";
import { FirstHeader } from "../components/headers";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import NormalContainer from "../components/styled/NormalContainer";
import Section from "../components/styled/Section";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";

function Settings() {
  const dispatch = useDispatch();
  const Header = () => <FirstHeader title="Settings" />;

  return (
    <ShadowyContainer header={Header}>
      <NormalContainer>
        <Section title="Lift settings">
          <div className="flex flex-col gap-px">
            <div className="w-full h-10 bg-primary-light rounded-sm"></div>
            <div className="w-full h-10 bg-primary-light rounded-sm"></div>
            <div className="w-full h-10 bg-primary-light rounded-sm"></div>
          </div>
        </Section>
        <Section title="Account">
          <div className="flex flex-col gap-px">
            <button
              className="w-full h-10 bg-primary-light rounded-sm text-warning font-bold"
              onClick={() => dispatch(action.authLogout())}
            >
              Log Out
            </button>
          </div>
        </Section>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default Settings;
