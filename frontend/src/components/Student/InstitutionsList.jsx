import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CommonStyles.css";

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get("http://localhost:4000/api/student/institutions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstitutions(response.data.institutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
        // Handle error state (e.g., redirect to login if unauthorized)
      }
    };

    fetchInstitutions();
  }, []);

  const handleInstitutionClick = (id) => {
    navigate(`/student/institution/${id}`);
  };

  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <h1>Institutions List</h1>
        <ul>
          {institutions.map((institution) => (
            <li key={institution._id} onClick={() => handleInstitutionClick(institution._id)}>
              {institution.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstitutionsList;
