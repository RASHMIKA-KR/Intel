// src/components/Center/NavigationBar.jsx
import { NavLink } from "react-router-dom";
import "../../assets/Stu-Navbar.css";

const CenterNavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink 
            to="/center/home" 
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/center/admissions" 
            className="nav-link"
            activeClassName="active"
          >
            Admissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/center/vacancy" 
            className="nav-link"
            activeClassName="active"
          >
            Vacancy
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/center/materials" 
            className="nav-link"
            activeClassName="active"
          >
            Materials
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/center/enquiries" 
            className="nav-link"
            activeClassName="active"
          >
            Enquiries
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/center/profile" 
            className="nav-link"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/center/logout" 
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

export default CenterNavigationBar;
