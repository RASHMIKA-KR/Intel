import { NavLink } from "react-router-dom";
import "../assets/StudentHome.css";

const StudentHome = () => {
  return (
    <div className="home-container">
      <nav>
        <ul>
          <li>
            <NavLink to="/student/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/student/institution" className={({ isActive }) => (isActive ? 'active' : '')}>Institution</NavLink>
          </li>
          <li>
            <NavLink to="/student/centre" className={({ isActive }) => (isActive ? 'active' : '')}>Centre</NavLink>
          </li>
          <li>
            <NavLink to="/student/admissions" className={({ isActive }) => (isActive ? 'active' : '')}>Admissions</NavLink>
          </li>
          <li>
            <NavLink to="/student/materials" className={({ isActive }) => (isActive ? 'active' : '')}>Materials</NavLink>
          </li>
          <li>
            <NavLink to="/student/myAdmissions" className={({ isActive }) => (isActive ? 'active' : '')}>My Admissions</NavLink>
          </li>
          <li>
            <NavLink to="/student/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/student/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <br></br>
        <h1>Student Home</h1>
        <p>Welcome to the Student Home page. Here, you can find all the information and resources you need as a student. Navigate through the links above to explore various sections like Institution, Centre, Admissions, Materials, My Admissions, Profile, and Logout.</p>
        <p>We aim to provide a seamless and efficient experience for all students. If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <h2>Latest News</h2>
        <ul>
          <li>New courses are available for the upcoming semester.</li>
          <li>Check out the latest materials in the Materials section.</li>
          <li>Admissions are now open for the summer term.</li>
        </ul>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Orientation for new students: July 15th</li>
          <li>Career fair: August 1st</li>
          <li>Workshop on resume building: August 10th</li>
        </ul>
        <p>Stay tuned for more updates and events!</p>
      </div>
    </div>
  );
};

export default StudentHome;
