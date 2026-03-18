import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div>
      <h2>Menu</h2>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/tasks">Tasks</Link>
        </li>

        <li>
          <Link to="/notes">Notes</Link>
        </li>

        <li>
          <Link to="/study">Study Tracker</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;