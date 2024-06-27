// src/components/Admin/NavigationBar.jsx
import { NavLink } from "react-router-dom";
import "../../assets/Stu-Navbar.css";

const AdminNavigationBar = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink 
              to="/admin/home" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/students" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/teachers" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Teachers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/institutions" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Institutions
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/centers" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Centers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/approvals" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Approvals
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/profile" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/logout" 
              className={({ isActive }) => (isActive ? 'active' : 'nav-link')}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavigationBar;
