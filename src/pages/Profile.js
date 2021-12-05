import React from "react";
import { FirstHeader } from "../components/headers";

function Profile({ setShowSidebar }) {
  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <FirstHeader setShowSidebar={setShowSidebar} title="Profile" />
    </div>
  );
}

export default Profile;
