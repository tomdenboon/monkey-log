import Sidebar from "../components/Sidebar";
import CustomSwitch from "../routes";

function Dashboard(props) {
  return (
    <div className="flex w-screen">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <CustomSwitch routes={props.routes} />
    </div>
  );
}

export default Dashboard;
