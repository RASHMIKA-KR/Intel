// src/components/Center/NavigationBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/NavigationBar.css"; // Assuming common navigation bar styles are here

const NavigationBar = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/center/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/center/admissions" className={({ isActive }) => (isActive ? 'active' : '')}>Admissions</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/center/vacancy" className={({ isActive }) => (isActive ? 'active' : '')}>Vacancy</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/center/materials" className={({ isActive }) => (isActive ? 'active' : '')}>Materials</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/center/enquiries" className={({ isActive }) => (isActive ? 'active' : '')}>Enquiries</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/center/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/center/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
