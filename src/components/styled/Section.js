import React from "react";

function Section({ title, children }) {
  return (
    <div className="w-full ">
      <h2 className="text-gray-400 font-bold text-xs pb-2">{title}</h2>
      {children}
    </div>
  );
}

export default Section;
