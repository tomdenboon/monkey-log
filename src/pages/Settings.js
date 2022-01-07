import React from "react";
import { FirstHeader } from "../components/headers";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import NormalContainer from "../components/styled/NormalContainer";
import Section from "../components/styled/Section";

function Settings() {
  const Header = () => <FirstHeader title="Settings" />;

  return (
    <ShadowyContainer header={Header}>
      <NormalContainer>
        <Section title="Lift settings">
          <div className="flex flex-col gap-px">
            <div className="w-full h-10 bg-white rounded-sm"></div>
            <div className="w-full h-10 bg-white rounded-sm"></div>
            <div className="w-full h-10 bg-white rounded-sm"></div>
          </div>
        </Section>
        <Section title="Account">
          <div className="flex flex-col gap-px">
            <button className="w-full h-10 bg-white rounded-sm text-red-500 font-bold">
              Log Out
            </button>
          </div>
        </Section>
      </NormalContainer>
    </ShadowyContainer>
  );
}

export default Settings;
