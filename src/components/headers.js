import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

function HeaderStyle({ children }) {
  return (
    <div
      className="flex items-center justify-between bg-gray-200 text-blue-500 text-2xl font-bold gap-2 
      sticky md:relative top-0 p-2 py-4 md:p-5 z-20"
    >
      {children}
    </div>
  );
}

function FirstHeader({ setShowSidebar, title, IconRight, linkToRight }) {
  return (
    <HeaderStyle>
      <div className="flex">
        <button
          className="md:hidden hover:bg-gray-300 text-xl rounded-full p-1"
          onClick={setShowSidebar}
        >
          <FiMenu />
        </button>
        {title}
      </div>
      <Link
        to={linkToRight}
        className="hover:bg-gray-300 rounded-full p-1 text-xl"
      >
        <IconRight />
      </Link>
    </HeaderStyle>
  );
}
export default HeaderStyle;
export { FirstHeader };
