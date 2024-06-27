import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CardStudent.css";

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/student/institutions", {
          withCredentials: true, // Ensures cookies are sent with requests
        });
        const approvedInstitutions = response.data.institutions.filter(institution => institution.status === 'Approved');
        setInstitutions(approvedInstitutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
        if (error.response && error.response.status === 401) {
          window.location.href = "/student/home";
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
