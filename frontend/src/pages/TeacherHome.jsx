import "../assets/Home.css";
import NavigationBar from "../components/Teacher/NavigationBarT";
const TeacherHome = () => {
  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <h1>Teacher Home</h1>
        <p>Welcome to the Teacher Home page. Here, you can find all the information and resources you need as a teacher. Navigate through the links above to explore various sections like Vacancy, Materials, My Applied Vacancy, Profile, and Logout.</p>
        <h2>Latest News</h2>
        <ul>
          <li>New vacancies are posted for various positions.</li>
          <li>Check out the latest materials in the Materials section.</li>
          <li>Apply for vacancies in the My Applied Vacancy section.</li>
        </ul>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Workshop on curriculum development: July 20th</li>
          <li>Seminar on educational technology: August 5th</li>
          <li>Professional development training: August 15th</li>
        </ul>
        <p>Stay updated with the latest news and events!</p>
      </div>
    </div>
  );
};

export default TeacherHome;
