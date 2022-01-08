import React, { useState } from "react";
import { FirstHeader } from "../components/headers";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import NormalContainer from "../components/styled/NormalContainer";
import Section from "../components/styled/Section";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import { useSelector } from "react-redux";
import ThemeModal from "../components/ThemeModal";

function Settings() {
  const selectedTheme = useSelector((state) => state.theme);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const dispatch = useDispatch();
  const Header = () => <FirstHeader title="Settings" />;

  return (
    <ShadowyContainer header={Header}>
      <ThemeModal showModal={showThemeModal} setShowModal={setShowThemeModal} />
      <NormalContainer>
        <Section title="Lift settings">
          <div className="flex flex-col gap-px">
            <div className="w-full h-10 bg-primary-light rounded-sm"></div>
            <div className="w-full h-10 bg-primary-light rounded-sm"></div>
            <div className="w-full h-10 bg-primary-light rounded-sm"></div>
          </div>
        </Section>
        <Section title="General">
          <div className="flex flex-col gap-px">
            <button
              className="flex items-center w-full h-10 bg-primary-light justify-between rounded-sm px-4"
              onClick={() => setShowThemeModal(true)}
            >
              <h4 className="font-semibold">Theme</h4>
              <p className="text-text-light">{selectedTheme.name}</p>
            </button>
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
