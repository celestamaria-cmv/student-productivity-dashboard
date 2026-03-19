import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">

      <h2 className="logo">Student Dashboard</h2>

      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>
            📝 Tasks
          </Link>
        </li>

        <li>
          <Link to="/notes" className={location.pathname === "/notes" ? "active" : ""}>
            📒 Notes
          </Link>
        </li>

        <li>
          <Link to="/study" className={location.pathname === "/study" ? "active" : ""}>
            📊 Study Tracker
          </Link>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;