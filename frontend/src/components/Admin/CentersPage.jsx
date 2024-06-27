import  { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const CentersPage = () => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/pending-centers');
        setCenters(response.data.data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };

    fetchCenters();
  }, []);

  return (
    <div className="centers-page">
      <h1>Pending Centers</h1>
      <div className="centers-list">
        {centers.map(center => (
          <NavLink key={center._id} to={`/admin/centers/${center._id}`} className="card">
            <h2>{center.name}</h2>
            <p>Status: {center.status}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CentersPage;
