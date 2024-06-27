import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CardStudent.css";

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
          window.location.href = "/home";
          return;
        }

        const response = await axios.get("http://localhost:4000/api/student/institutions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const approvedInstitutions = response.data.institutions.filter(institution => institution.status === 'Approved');
        setInstitutions(approvedInstitutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
        if (error.response && error.response.status === 401) {
          window.location.href = "/home";
        } else {
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
          <div className="card-container">
            {institutions.map((institution) => (
              <div
                key={institution._id}
                className="card"
                onClick={() => handleInstitutionClick(institution._id)}
              >
                <h2>{institution.name}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p>No approved institutions found.</p>
        )}
      </div>
    </div>
  );
};

export default InstitutionsList;
