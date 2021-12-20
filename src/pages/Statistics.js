import React from "react";
import { FirstHeader } from "../components/headers";
import ShadowyContainer from "../components/styled/ShadowyContainer";
import NormalContainer from "../components/styled/NormalContainer";

function Statistics() {
  const Header = () => <FirstHeader title="Statistics" />;

  return (
    <ShadowyContainer header={Header}>
      <NormalContainer></NormalContainer>
    </ShadowyContainer>
  );
}

export default Statistics;
