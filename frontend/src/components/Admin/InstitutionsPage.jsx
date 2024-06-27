import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const InstitutionsPage = () => {
  const [pendingInstitutions, setPendingInstitutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingInstitutions = async () => {
      try {
        const token = getCookie("authToken");
        if (!token) {
          console.log("No token found. You are not authorized to access this page.");
          // Redirect to login page
          navigate('/admin/home');
          return;
        }

        const response = await axios.get('http://localhost:4000/api/admin/pending-institutions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response is successful and data exists
        if (response.data.success && response.data.data) {
          setPendingInstitutions(response.data.data);
        } else {
          console.error('Failed to fetch pending institutions:', response.data);
          // Display an error message or handle as needed
          alert('Failed to fetch pending institutions');
        }

      } catch (error) {
        console.error('Error fetching pending institutions:', error);
        // Redirect to login page or show error message
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired, redirect to login page
          navigate('/admin/home');
        } else {
          // Display an error message
          alert('Error fetching pending institutions: ' + error.message);
        }
      }
    };

    fetchPendingInstitutions();
  }, [navigate]);

  return (
    <div className="institutions-page">
      <h1>Pending Institutions</h1>
      <div className="institutions-list">
        {pendingInstitutions.map(institution => (
          <NavLink key={institution._id} to={`/admin/institutions/${institution._id}`} className="card">
            <h2>{institution.name}</h2>
            <p>Status: {institution.status}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default InstitutionsPage;
