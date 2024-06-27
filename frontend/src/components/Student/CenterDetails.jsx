// src/components/Student/CenterDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CommonStyles.css";

const CenterDetails = () => {
  const { id } = useParams();
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`http://localhost:4000/api/student/centers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCenter(response.data.center);
      } catch (error) {
        console.error("Error fetching center:", error);
        // Handle error state (e.g., redirect to login if unauthorized)
      }
    };

    fetchCenter();
  }, [id]);

  if (!center) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <h1>{center.name}</h1>
        <p>{center.description}</p>
        {/* Add admission form here */}
      </div>
    </div>
  );
};

export default CenterDetails;
