import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const InstitutionDetail = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/pending-institutions/${id}`);
        setInstitution(response.data.data);
      } catch (error) {
        console.error('Error fetching institution:', error);
      }
    };

    fetchInstitution();
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:4000/api/admin/approve-institution/${id}`);
      navigate('/admin/institutions');
    } catch (error) {
      console.error('Error approving institution:', error);
    }
  };

  const handleDeny = async () => {
    try {
      await axios.put(`http://localhost:4000/api/admin/deny-institution/${id}`);
      navigate('/admin/institutions');
    } catch (error) {
      console.error('Error denying institution:', error);
    }
  };

  if (!institution) {
    return <div>Loading...</div>;
  }

  return (
    <div className="institution-detail">
      <h1>{institution.name}</h1>
      <p>Status: {institution.status}</p>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleDeny}>Deny</button>
    </div>
  );
};

export default InstitutionDetail;
