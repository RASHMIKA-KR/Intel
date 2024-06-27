
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/InstitutionDetails.css";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const InstitutionDetails = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitutionDetails = async () => {
      try {
        const token = getCookie("authToken");
        if (!token) {
          console.log("No token found. You are not authorized to access this page.");
          window.location.href = "/home";
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/student/institution/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstitution(response.data.institution);
      } catch (error) {
        console.error("Error fetching institution details:", error);
        if (error.response && error.response.status === 401) {
          window.location.href = "/home";
        } else {
          alert("Error fetching institution details: " + error.message);
        }
      }
    };

    fetchInstitutionDetails();
  }, [id]);

  if (!institution) {
    return (
      <div className="home-container">
        <NavigationBar />
        <div className="content">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <h1>{institution.name}</h1>
        <p><strong>Email:</strong> {institution.email}</p>
        <p><strong>Phone:</strong> {institution.phone}</p>
        <p><strong>Address:</strong> {institution.address}</p>
        <p><strong>Website:</strong> <a href={institution.website} target="_blank" rel="noopener noreferrer">{institution.website}</a></p>
        <p><strong>Type:</strong> {institution.institutionType}</p>
        <p><strong>Description:</strong> {institution.description}</p>
        <img src={institution.image.url} alt={institution.name} style={{ maxWidth: "100%" }} />
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default InstitutionDetails;
