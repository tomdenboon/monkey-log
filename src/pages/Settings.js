import React from "react";
import { FirstHeader } from "../components/headers";

function Settings({ setShowSidebar }) {
  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <FirstHeader setShowSidebar={setShowSidebar} title="Settings" />
    </div>
  );
}

export default Settings;
