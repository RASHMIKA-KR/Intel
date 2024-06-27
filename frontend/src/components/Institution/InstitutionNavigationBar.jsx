// src/components/Institution/NavigationBar.jsx
import { NavLink } from "react-router-dom";
import "../../assets/Stu-Navbar.css";

const InstitutionNavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink 
            to="/institution/home" 
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/institution/admissions" 
            className="nav-link"
            activeClassName="active"
          >
            Admissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/institution/vacancy" 
            className="nav-link"
            activeClassName="active"
          >
            Vacancy
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/institution/materials" 
            className="nav-link"
            activeClassName="active"
          >
            Materials
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/institution/enquiries" 
            className="nav-link"
            activeClassName="active"
          >
            Enquiries
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/institution/profile" 
            className="nav-link"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/institution/logout" 
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

export default InstitutionNavigationBar;
