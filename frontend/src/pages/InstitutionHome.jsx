import NavigationBar from "../components/Institution/NavigationBarI"; // Update the path accordingly
import "../assets/Home.css"; // Update the path accordingly

const InstitutionHome = () => {
  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <br></br>
        <h1>Institution Home</h1>
        <p>Welcome to the Institution Home page. Here, you can find all the information and resources you need as an institution. Navigate through the links above to explore various sections like Admissions, Vacancy, Materials, Inquiries, Profile, and Logout.</p>
        <h2>Latest Updates</h2>
        <ul>
          <li>New admissions are now open.</li>
          <li>Check out the current job vacancies.</li>
          <li>Upload new materials for students.</li>
        </ul>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Faculty meeting: July 20th</li>
          <li>Open house for prospective students: August 5th</li>
          <li>Workshop on academic excellence: August 15th</li>
        </ul>
        <p>Stay tuned for more updates and events!</p>
      </div>
    </div>
  );
};

export default InstitutionHome;
