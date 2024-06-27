// src/components/Teacher/NavigationBar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/teacher/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teacher/vacancy" className={({ isActive }) => (isActive ? 'active' : '')}>Vacancy</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teacher/materials" className={({ isActive }) => (isActive ? 'active' : '')}>Materials</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teacher/myAppliedVacancy" className={({ isActive }) => (isActive ? 'active' : '')}>My Applied Vacancy</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teacher/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teacher/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
