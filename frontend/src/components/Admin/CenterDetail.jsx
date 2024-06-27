import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CenterDetail = () => {
  const { id } = useParams();
  const [center, setCenter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/pending-centers/${id}`);
        setCenter(response.data.data);
      } catch (error) {
        console.error('Error fetching center:', error);
      }
    };

    fetchCenter();
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:4000/api/admin/approve-center/${id}`);
      navigate('/admin/centers');
    } catch (error) {
      console.error('Error approving center:', error);
    }
  };

  const handleDeny = async () => {
    try {
      await axios.put(`http://localhost:4000/api/admin/deny-center/${id}`);
      navigate('/admin/centers');
    } catch (error) {
      console.error('Error denying center:', error);
    }
  };

  if (!center) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center-detail">
      <h1>{center.name}</h1>
      <p>Status: {center.status}</p>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleDeny}>Deny</button>
    </div>
  );
};

export default CenterDetail;
