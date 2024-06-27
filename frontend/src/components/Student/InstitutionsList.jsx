import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../../assets/StudentHome.css"; // Assuming you want the same styles

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get("http://localhost:4000/api/student/institutions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstitutions(response.data.institutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    fetchInstitutions();
  }, []);

  return (
    <div className="home-container">
      <nav>
        <ul>
          <li>
            <NavLink to="/student/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/student/institution" className={({ isActive }) => (isActive ? 'active' : '')}>Institution</NavLink>
          </li>
          <li>
            <NavLink to="/student/centre" className={({ isActive }) => (isActive ? 'active' : '')}>Centre</NavLink>
          </li>
          <li>
            <NavLink to="/student/admissions" className={({ isActive }) => (isActive ? 'active' : '')}>Admissions</NavLink>
          </li>
          <li>
            <NavLink to="/student/materials" className={({ isActive }) => (isActive ? 'active' : '')}>Materials</NavLink>
          </li>
          <li>
            <NavLink to="/student/myAdmissions" className={({ isActive }) => (isActive ? 'active' : '')}>My Admissions</NavLink>
          </li>
          <li>
            <NavLink to="/student/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/student/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>Institutions List</h1>
        <ul>
          {institutions.map((institution) => (
            <li key={institution._id}>{institution.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstitutionsList;
