import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Context } from "../../main";
import "../../assets/InstitutionRegistration.css";

const InstitutionRegistrationLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImageFile] = useState(null); // Changed to single file state
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      console.log("Selected file:", image); // Log the file to check
      setImageFile(image);
    } else {
      toast.error("No file selected");
    }
  };
  

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener("click", () => {
        container.classList.add("right-panel-active");
      });
      signInButton.removeEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    };
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("type", "institution");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("website", website);
      formData.append("institutionType", institutionType);
      formData.append("description", description);
      
      if (image) {
        console.log("Appending file to formData:", image); // Log the file to check
        formData.append("image", image);
      } else {
        toast.error("Please select an image file.");
        return;
      }
      // Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
      const response = await axios.post(
        "http://localhost:4000/api/institution/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        clearFormFields();
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error for debugging
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/institution/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setIsAuthorized(true);
        return <Navigate to="/institution/home" />;
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Sign-in failed. Please try again."
      );
    }
  };

  const clearFormFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setWebsite("");
    setInstitutionType("");
    setDescription("");
    setImageFile(null); // Reset to null for single file upload
  };


  if (isAuthorized) {
    return <Navigate to={"/institution/home"} />;
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Institution Account</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <select
            className="select-dropdown"
            value={institutionType}
            onChange={(e) => setInstitutionType(e.target.value)}
          >
            <option value="">Select Institution Type</option>
            <option value="School">School</option>
            <option value="College">College</option>
          </select>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Institution Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default InstitutionRegistrationLogin;
