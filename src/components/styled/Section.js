import React from "react";

function Section({ title, children }) {
  return (
    <div className="w-full ">
      <h2 className="text-text-lightest text-xs  pb-2">
        {title.toUpperCase()}
      </h2>
      {children}
    </div>
  );
}

export default Section;
