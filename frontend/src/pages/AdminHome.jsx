import { NavLink } from "react-router-dom";
import "../assets/AdminHome.css";

const AdminHome = () => {
  return (
    <div className="home-container">
      <nav>
        <ul>
        <li>
          <NavLink to="/admin/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/students" className={({ isActive }) => (isActive ? 'active' : '')}>Students</NavLink>
          </li>
          <li>
            <NavLink to="/admin/teachers" className={({ isActive }) => (isActive ? 'active' : '')}>Teachers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/institutions" className={({ isActive }) => (isActive ? 'active' : '')}>Institutions</NavLink>
          </li>
          <li>
            <NavLink to="/admin/centers" className={({ isActive }) => (isActive ? 'active' : '')}>Centers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/approvals" className={({ isActive }) => (isActive ? 'active' : '')}>Approvals</NavLink>
          </li>
          <li>
            <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/admin/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <br></br>
        <h1>Admin Home</h1>
        <p>Welcome to the Admin Home page. Here, you can manage students, teachers, institutions, and centers. Use the navigation links above to explore various sections such as Students, Teachers, Institutions, Centers, Profile, and Logout.</p>
        <p>We aim to provide a seamless and efficient experience for all administrators. If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <h2>Latest Updates</h2>
        <ul>
          <li>New teacher assignments have been updated.</li>
          <li>Check the latest student admissions in the Students section.</li>
          <li>Institutional data has been revised for the new academic year.</li>
        </ul>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Administrator meeting: July 20th</li>
          <li>Teacher training session: August 5th</li>
          <li>Workshop on student management systems: August 15th</li>
        </ul>
        <p>Stay tuned for more updates and events!</p>
      </div>
    </div>
  );
};

export default AdminHome;
