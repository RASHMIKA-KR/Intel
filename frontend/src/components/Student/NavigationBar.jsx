import { NavLink } from "react-router-dom";
import "../../assets/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink 
            to="/student/home" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/institution" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Institution
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/centre" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Center
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/admissions" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/materials" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Materials
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/myAdmissions" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Admissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/profile" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/logout" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;