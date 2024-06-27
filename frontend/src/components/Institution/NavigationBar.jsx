import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/NavigationBar.css"; // Update the path accordingly

const NavigationBar = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/institution/home" activeClassName="active">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/institution/admissions" activeClassName="active">Admissions</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/institution/vacancy" activeClassName="active">Vacancy</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/institution/materials" activeClassName="active">Materials</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/institution/inquiries" activeClassName="active">Inquiries</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/institution/profile" activeClassName="active">Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/institution/logout" activeClassName="active">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
