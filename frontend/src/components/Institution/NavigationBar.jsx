import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/NavigationBar.css"; // Update the path accordingly

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink 
            to="/institution/home" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/institution/admissions" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admissions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/institution/vacancy" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Vacancy
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/institution/materials" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Materials
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/institution/inquiries" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Enquiries
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/institution/profile" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/institution/logout" 
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
