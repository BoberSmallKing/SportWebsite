import Sidebar from "../../components/ui/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles/dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
