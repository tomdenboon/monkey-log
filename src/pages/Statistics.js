import React from "react";
import { FirstHeader } from "../components/headers";

function Statistics({ setShowSidebar }) {
  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <FirstHeader setShowSidebar={setShowSidebar} title="Statistics" />
    </div>
  );
}

export default Statistics;
