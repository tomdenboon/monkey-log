import React from "react";
import { FirstHeader } from "../components/headers";

function History({ setShowSidebar }) {
  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <FirstHeader setShowSidebar={setShowSidebar} title="History" />
    </div>
  );
}

export default History;
