// src/pages/CenterHome.jsx
import React from "react";
import NavigationBar from "../components/Center/NavigationBar";
import "../assets/StudentHome.css"; // Assuming common styles are here

const CenterHome = () => {
  return (
    <div className="home-container">
      <NavigationBar />
      <div className="content">
        <br></br>
        <h1>Center Home</h1>
        <p>Welcome to the Center Home page. Here, you can find all the information and resources you need as a center administrator. Navigate through the links above to explore various sections like Admissions, Vacancy, Materials, Enquiries, Profile, and Logout.</p>
        <p>We aim to provide a seamless and efficient experience for all center administrators. If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <h2>Latest Updates</h2>
        <ul>
          <li>New training sessions available for center staff.</li>
          <li>Updated materials in the Materials section.</li>
          <li>Admissions are now open for the upcoming term.</li>
        </ul>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Center staff meeting: July 20th</li>
          <li>Community outreach program: August 5th</li>
          <li>Workshop on facility management: August 15th</li>
        </ul>
        <p>Stay tuned for more updates and events!</p>
      </div>
    </div>
  );
};

export default CenterHome;
