import React from "react";

function NormalContainer({ children }) {
  return (
    <div className="flex flex-col px-2 py-2 md:px-4 xl:px-8 gap-5">
      {children}
    </div>
  );
}

export default NormalContainer;
