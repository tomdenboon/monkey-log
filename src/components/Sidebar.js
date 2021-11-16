import { FiUser, FiBarChart, FiZap, FiFolder, FiList } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="flex flex-col gap-1 p-1 bg-gray-50 h-screen w-72 overflow-auto">
      <div className="p-2 font-bold text-2xl">MonkeyLog</div>
      <div className="p-2 rounded cursor-pointer flex gap-2 items-center">
        <FiUser />
        Tom den Boon
      </div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiFolder />
        My exercises
      </div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiBarChart />
        Statistics
      </div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiZap className=" text-red-300" />
        Active workout
      </div>
      <div className="w-full min-h-[1px] bg-gray-200"></div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiList />
        Jeffrey's workout's list
      </div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiList />
      </div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiList />
        Jeffrey's workout's list
      </div>
      <div className="flex gap-2 hover:bg-white p-2 rounded cursor-pointer items-center filter hover:shadow-sm">
        <FiList />
        Jeffrey's workout's list
      </div>
    </div>
  );
}

export default Sidebar;
