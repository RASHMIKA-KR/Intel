import { NavLink } from 'react-router-dom';
import "../../assets/Stu-Navbar.css"; // Import your CSS file

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink 
            to="/student/home" 
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/institution" 
            className="nav-link"
            activeClassName="active"
          >
            Institution
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/centre" 
            className="nav-link"
            activeClassName="active"
          >
            Center
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/admissions" 
            className="nav-link"
            activeClassName="active"
          >
            Admissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/materials" 
            className="nav-link"
            activeClassName="active"
          >
            Materials
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/myAdmissions" 
            className="nav-link"
            activeClassName="active"
          >
            My Admissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/profile" 
            className="nav-link"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/logout" 
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
