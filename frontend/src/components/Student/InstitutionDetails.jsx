// src/components/Students/InstitutionDetails.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "../../assets/CommonStyles.css";

const InstitutionDetails = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`http://localhost:4000/api/student/institutions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstitution(response.data.institution);
      } catch (error) {
        console.error("Error fetching institution:", error);
        // Handle error state (e.g., redirect to login if unauthorized)
      }
    };

    const fetchAdmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admissions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmissions(response.data.data);
      } catch (error) {
        console.error("Error fetching admissions:", error);
      }
    };

    fetchInstitution();
    fetchAdmissions();
  }, [id]);

  if (!institution) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <h1>{institution.name}</h1>
        <p>{institution.description}</p>
        <h2>Admissions</h2>
        {admissions.length > 0 ? (
          admissions.map((admission) => (
            <div key={admission._id} className="admission-card">
              <h3>{admission.courseName}</h3>
              <p>{admission.description}</p>
              <p>Eligibility: {admission.eligibilityCriteria}</p>
              <p>Application Deadline: {new Date(admission.applicationDeadline).toLocaleDateString()}</p>
              <Link to={`/apply/${admission._id}`} className="apply-button">Apply</Link>
            </div>
          ))
        ) : (
          <p>No admissions available.</p>
        )}
      </div>
    </div>
  );
};

export default InstitutionDetails;
