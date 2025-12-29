import { Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default Dashboard;
