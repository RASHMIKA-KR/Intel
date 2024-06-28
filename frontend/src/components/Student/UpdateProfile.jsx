import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import StudentNavigationBar from './StudentNavigationBar';
import '../../assets/Profile.css'; // Assuming this is your CSS file
import toast, { Toaster } from 'react-hot-toast';

const UpdateProfile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/student/profile/${id}`, {
          withCredentials: true,
        });
        setFormData(response.data.student);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        // Handle errors, e.g., redirecting to login page on unauthorized access
      }
    };

    fetchStudent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/student/updateProfile/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      // Navigate back to student profile after update
      // Replace the `id` in the URL with the updated student ID if necessary
      // history.push(`/student/profile/${id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    }
  };

  return (
    <div className="student-profile-container">
      <StudentNavigationBar />
      <div className="update-student-profile-content">
        <h1>Update Profile</h1>
        <br/>
        <div className="student-profile-details">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender || ''}
            onChange={handleInputChange}
            placeholder="Gender"
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleInputChange}
            placeholder="Age"
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleInputChange}
            placeholder="Phone"
          />
          <label>Institution Type</label>
          <input
            type="text"
            name="institutionType"
            value={formData.institutionType || ''}
            onChange={handleInputChange}
            placeholder="Institution Type"
          />
          <label>Institution Name</label>
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName || ''}
            onChange={handleInputChange}
            placeholder="Institution Name"
          />
          {formData.institutionType === 'School' ? (
            <>
              <label>Standard</label>
              <input
                type="text"
                name="standard"
                value={formData.standard || ''}
                onChange={handleInputChange}
                placeholder="Standard"
              />
            </>
          ) : (
            <>
              <label>College Department</label>
              <input
                type="text"
                name="collegeDepartment"
                value={formData.collegeDepartment || ''}
                onChange={handleInputChange}
                placeholder="College Department"
              />
              <label>Year of Study</label>
              <input
                type="number"
                name="yearOfStudy"
                value={formData.yearOfStudy || ''}
                onChange={handleInputChange}
                placeholder="Year of Study"
              />
            </>
          )}
          <div className="button-group">
            <Link>
              <button className="student-update-profile-button" onClick={handleUpdateProfile}>Update</button>
            </Link>
            
            <Link to={`/student/profile/${id}`} className="cancel-button-link">
              <button className="student-update-profile-button">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UpdateProfile;
