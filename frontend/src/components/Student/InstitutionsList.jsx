import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import NavigationBar from "./NavigationBar";
import "../../assets/CommonStyles.css";
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const token = getCookie("authToken");
        if (!token) {
          console.log("No token found. You are not authorized to access this page.");
          // Redirect to login page
          window.location.href = "/home";
          return;
        }

        const response = await axios.get("http://localhost:4000/api/student/institutions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter institutions with status 'Approved' before setting state
        const approvedInstitutions = response.data.institutions.filter(institution => institution.status === 'Approved');
        setInstitutions(approvedInstitutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
        // Display an error message or redirect to an error page
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired, redirect to login page
          window.location.href = "/home";
        } else {
          // Display an error message
          alert("Error fetching institutions: " + error.message);
        }
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
        {institutions.length > 0 ? (
          <ul>
            {institutions.map((institution) => (
              <li key={institution._id}>{institution.name}</li>
            ))}
          </ul>
        ) : (
          <p>No approved institutions found.</p>
        )}
      </div>
    </div>
  );
};

export default InstitutionsList;
