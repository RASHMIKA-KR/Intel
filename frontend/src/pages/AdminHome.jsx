import AdminNavigationBar from "../components/Admin/AdminNavigationBar";
import "../assets/Home.css";

const AdminHome = () => {
  return (
    <div className="home-container">
      <AdminNavigationBar />
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
