import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./frontend/src/main"; // Assuming you have defined your context in main.js or main.jsx

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
    <section className="materials page">
      <div className="container">
        <h1>All Available Materials</h1>
        <div className="banner">
          {/* Map over materials array and render each material as a card */}
          {materials.map((material) => (
            <div className="card" key={material._id}>
              <p>Title: {material.name}</p> {/* Display material name */}
              <p>Material Type: {material.materialType}</p> {/* Display material type */}
              <p>Uploaded By: {material.uploadedBy}</p> {/* Display uploader */}
              {/* Link to material details page */}
              <Link to={`/material/${material._id}`}>Material Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialList;
