// src/components/Teacher/NavigationBar.jsx
import { NavLink } from "react-router-dom";
import "../../assets/Stu-Navbar.css";
const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink 
            to="/teacher/home" 
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/teacher/materials" 
            className="nav-link"
            activeClassName="active"
          >
            Materials
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/vacancy" 
            className="nav-link"
            activeClassName="active"
          >
            Vacancy
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/teacher/myAppliedVacancy" 
            className="nav-link"
            activeClassName="active"
          >
            My Applied Vacancy
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/teacher/profile" 
            className="nav-link"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/teacher/logout" 
            className="nav-link"
            activeClassName="active"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};


export default NavigationBar;
