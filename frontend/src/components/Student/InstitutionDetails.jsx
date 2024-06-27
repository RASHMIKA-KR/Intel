import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { Context } from "../../main";
import "../../assets/InstitutionDetails.css";
const InstitutionDetails = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const navigate = useNavigate();
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    const fetchInstitutionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/student/institutions/${id}`, {
          withCredentials: true,
        });
        setInstitution(response.data.institution);
      } catch (error) {
        console.error("Error fetching institution details:", error);
        if (error.response && error.response.status === 404) {
          navigate("/notfound"); // Redirect to notfound page if institution is not found
        } else if (error.response && error.response.status === 401) {
          navigate("/student/institution"); // Redirect to login page if unauthorized
        } else {
          alert("Error fetching institution details: " + error.message);
        }
      }
    };

    if (isAuthorized) {
      fetchInstitutionDetails();
    } else {
      navigate("/student/institution"); // Redirect to login page if not authorized
    }
  }, [id, isAuthorized, navigate]);

  // Conditional rendering based on institution state
  if (!institution) {
    return (
      <div className="stu-ins-container">
        <NavigationBar />
        <div className="content">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  // Once institution is loaded, render details
  // Adjusted JSX with unique class names
return (
  <div className="stu-ins-container">
    <NavigationBar />
    <div className="stu-ins-content">
      <div className="details">
        <h1>{institution.name}</h1>
        <p><strong>Email:</strong> {institution.email}</p>
        <p><strong>Phone:</strong> {institution.phone}</p>
        <p><strong>Address:</strong> {institution.address}</p>
        <p><strong>Website:</strong> <a href={institution.website} target="_blank" rel="noopener noreferrer">{institution.website}</a></p>
        <p><strong>Type:</strong> {institution.institutionType}</p>
        <p><strong>Description:</strong> {institution.description}</p>
      </div>
      <div className="image">
        <img src={institution.image.url} alt={institution.name} />
      </div>
    </div>
    <div className="button-container">
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  </div>
);

};

export default InstitutionDetails;
