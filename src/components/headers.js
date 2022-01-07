import React from "react";
import { Link } from "react-router-dom";

function HeaderStyle({ children }) {
  return (
    <div
      className="flex items-center justify-between text-gray-700 bg-gray-100 text-xl font-bold gap-2 
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
        <Link
          to={linkToRight}
          className="flex rounded-full text-xl pl-2 h-8 w-8  text-secondary"
        >
          <IconRight className="w-full h-full" />
        </Link>
      )}
    </HeaderStyle>
  );
}
export default HeaderStyle;
export { FirstHeader };
