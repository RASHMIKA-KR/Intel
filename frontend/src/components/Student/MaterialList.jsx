import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main"; // Assuming you have defined your context in main.js or main.jsx
import StudentNavigationBar from "./StudentNavigationBar";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]); // State to hold materials array
  const { isAuthorized } = useContext(Context); // Accessing isAuthorized from context
  const navigateTo = useNavigate(); // Navigate function from react-router-dom

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // Fetch materials from backend API
        const response = await axios.get("http://localhost:4000/api/student/materials", {
          withCredentials: true, // Send cookies with the request if needed
        });
        // Update materials state with response data
        setMaterials(response.data);
      } catch (error) {
        console.log("Error fetching materials:", error);
      }
    };

    fetchMaterials(); // Call fetchMaterials function on component mount
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Redirect to login page if user is not authorized
  if (!isAuthorized) {
    navigateTo("/");
  }

  // JSX rendering
  return (
    <div className="home-container">
      <StudentNavigationBar />
      <div className="content">
        <h1>All Available Materials</h1>
        <ul>
          {materials.map((material) => (
            <li key={material._id}>
              <p>Title: {material.name}</p>
              <p>Material Type: {material.materialType}</p>
              <p>Uploaded By: {material.uploadedBy}</p>
              <Link to={`/material/${material._id}`}>Material Details</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaterialList;
