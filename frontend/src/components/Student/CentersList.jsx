// src/components/Student/CentersList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CommonStyles.css";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const CentersList = () => {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const token = getCookie("authToken");
        if (!token) {
          console.log("No token found. You are not authorized to access this page.");
          // Redirect to login page
          window.location.href = "/home";
          return;
        }

        const response = await axios.get("http://localhost:4000/api/student/centers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCenters(response.data.centers);
      } catch (error) {
        console.error("Error fetching centers:", error);
        // Display an error message or redirect to an error page
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired, redirect to login page
          window.location.href = "/home";
        } else {
          // Display an error message
          alert("Error fetching centers: " + error.message);
        }
      }
    };

    fetchCenters();
  }, []);

  const handleCenterClick = (id) => {
    navigate(`/student/center/${id}`);
  };

  return (
    <div className="page-container">
      <NavigationBar />
      <div className="content-container">
        <h1>Centers List</h1>
        {centers.length > 0 ? (
          <ul>
            {centers.map((center) => (
              <li key={center._id} onClick={() => handleCenterClick(center._id)}>
                {center.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No centers found.</p>
        )}
      </div>
    </div>
  );
};

export default CentersList;
