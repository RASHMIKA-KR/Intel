// src/components/Student/CentersList.jsx
import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentNavigationBar from "./StudentNavigationBar";
import "../../assets/CardStudent.css"; // Assuming you have this CSS file for common styles

const CentersList = () => {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        
        const response = await axios.get("http://localhost:4000/api/student/centers", {
          withCredentials: true, // Ensures cookies are sent with requests
        });
        // Filter centers with status 'Approved' before setting state
        const approvedCenters = response.data.centers.filter(center => center.status === 'Approved');
        setCenters(approvedCenters); // Set centers correctly
        
      } catch (error) {
        console.error("Error fetching centers:", error);
        if (error.response && error.response.status === 401) {
          window.location.href = "student/home";
        } else {
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
    <div className="card-home-container">
      <StudentNavigationBar />
      <div className="card-content">
        <h1>Centers List</h1>
        {centers.length > 0 ? (
          <div className="single-card-container">
            {centers.map((center) => (
              <div key={center._id}
               className="single-card"
                onClick={() => handleCenterClick(center._id)}
              >
                <h2>{center.name}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p>No approved centers found.</p>
        )}
      </div>
    </div>
  );
};

export default CentersList;
