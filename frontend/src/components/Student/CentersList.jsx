// src/components/Student/CentersList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CommonStyles.css";

const CentersList = () => {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get("http://localhost:4000/api/student/centers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCenters(response.data.centers);
      } catch (error) {
        console.error("Error fetching centers:", error);
        // Handle error state (e.g., redirect to login if unauthorized)
      }
    };

    fetchCenters();
  }, []);

  const handleCenterClick = (id) => {
    navigate(`/student/center/${id}`);
  };

  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <h1>Centers List</h1>
        <ul>
          {centers.map((center) => (
            <li key={center._id} onClick={() => handleCenterClick(center._id)}>
              {center.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CentersList;
