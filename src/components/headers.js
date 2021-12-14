import React from "react";
import { Link } from "react-router-dom";

function HeaderStyle({ children }) {
  return (
    <div
      className="flex items-center justify-between bg-gray-200 text-blue-500 text-xl font-bold gap-2 
      sticky top-0 z-30 px-2 h-12 md:px-4 xl:px-8"
    >
      {children}
    </div>
  );
}

function FirstHeader({ title, IconRight, linkToRight }) {
  return (
    <HeaderStyle>
      <div className="flex items-center">{title}</div>
      {linkToRight && (
        <Link to={linkToRight} className="rounded-full text-xl">
          <IconRight />
        </Link>
      )}
    </HeaderStyle>
  );
}
export default HeaderStyle;
export { FirstHeader };
