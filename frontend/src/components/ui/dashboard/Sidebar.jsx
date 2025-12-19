import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Панель тренера</div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard/team"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Команда
        </NavLink>

        <NavLink
          to="/dashboard/fights"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Бои
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
