// src/components/Student/CenterDetails.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/InstitutionDetails.css";
import { Context } from "../../main";

const CenterDetails = () => {
  const { id } = useParams();
  const [center, setCenter] = useState(null);
  const navigate = useNavigate();
  const { isAuthorized } = useContext(Context);
  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/student/centers/${id}`, {
          withCredentials: true,
        });
        setCenter(response.data.center);
      } catch (error) {
        console.error("Error fetching center details", error);
        if (error.response && error.response.status === 404) {
          navigate("/notfound"); // Redirect to notfound page if institution is not found
        } else if (error.response && error.response.status === 401) {
          navigate("/student/center"); // Redirect to login page if unauthorized
        } else {
          alert("Error fetching center details: " + error.message);
        }
      }
    };
    if (isAuthorized) {
      fetchCenterDetails();
    } else {
      navigate("/student/center"); // Redirect to login page if not authorized
    }
  }, [id, isAuthorized, navigate]);

  if (!center) {
    return (
      <div className="stu-ins-container">
        <NavigationBar />
        <div className="content">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="stu-ins-container">
    <NavigationBar />
    <div className="stu-ins-content">
      <div className="details">
        <h1>{center.name}</h1>
        <p><strong>Email:</strong> {center.email}</p>
        <p><strong>Phone:</strong> {center.phone}</p>
        <p><strong>Address:</strong> {center.address}</p>
        <p><strong>Type:</strong> {center.institutionType}</p>
        <p><strong>Description:</strong> {center.description}</p>
      </div>
      <div className="image">
        <img src={center.image.url} alt={center.name} />
      </div>
    </div>
    <div className="button-container">
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  </div>
);

};

export default CenterDetails;
