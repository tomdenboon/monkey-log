import Sidebar from "../components/Sidebar";
import CustomSwitch from "../routes";

function Dashboard(props) {
  return (
    <div className="flex">
      <Sidebar />
      <CustomSwitch routes={props.routes} />
    </div>
  );
}

export default Dashboard;
