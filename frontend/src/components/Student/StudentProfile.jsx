import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import StudentNavigationBar from './StudentNavigationBar';
import '../../assets/Profile.css'; // Assuming this is your CSS file

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/student/profile/${id}`, {
          withCredentials: true, // Ensures cookies are sent with requests if needed
        });
        setStudent(response.data.student);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        // Handle errors, e.g., redirecting to login page on unauthorized access
      }
    };

    fetchStudent();
  }, [id]);

  return (
    <div className="student-profile-container">
      <StudentNavigationBar />
      <div className="student-profile-content">
        <h1>Student Profile</h1>
        {student ? (
          <div className="student-profile-details">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Institution Type:</strong> {student.institutionType}</p>
            <p><strong>Institution Name:</strong> {student.institutionName}</p>
            {student.institutionType === 'School' ? (
              <p><strong>Standard:</strong> {student.standard}</p>
            ) : (
              <>
                <p><strong>College Department:</strong> {student.collegeDepartment}</p>
                <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
              </>
            )}
        
            <Link to={`/student/updateProfile/${id}`} >
              <button className="student-update-profile-button">Update Profile</button>
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
