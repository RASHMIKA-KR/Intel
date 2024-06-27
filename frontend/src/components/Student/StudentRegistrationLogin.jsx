import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import "../../assets/RegistrationLogin.css";
import { Context } from "../../main";
import Cookies from 'js-cookie';

const StudentRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [standard, setStandard] = useState("");
  const [collegeDepartment, setCollegeDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/student/register",
        {
          name,
          email,
          password,
          gender,
          address,
          age,
          phone,
          institutionType,
          institutionName,
          standard,
          collegeDepartment,
          yearOfStudy,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        clearFormFields();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/student/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const token = response.data.token;
        if (token) {
          Cookies.set('authToken', token, { expires: 1 }); // Set the token as a cookie
          toast.success(response.data.message);
          clearSignInFields();
          setIsAuthorized(true);
        } else {
          toast.error("No token received. Please try again.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const clearFormFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setGender("");
    setAddress("");
    setAge("");
    setPhone("");
    setInstitutionType("");
    setInstitutionName("");
    setStandard("");
    setCollegeDepartment("");
    setYearOfStudy("");
  };

  const clearSignInFields = () => {
    setEmail("");
    setPassword("");
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

    // Cleanup event listeners
    return () => {
      signUpButton.removeEventListener("click", () => {
        container.classList.add("right-panel-active");
      });
      signInButton.removeEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    };
  }, []); // Ensure this runs only once on component mount

  if (isAuthorized) {
    return <Navigate to={"/student/home"} />;
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <br />
          <h1>Create Account</h1>
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
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

          <input
            type="text"
            placeholder="Institution Name"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
          {institutionType === "School" && (
            <input
              type="text"
              placeholder="Standard"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
            />
          )}
          {institutionType === "College" && (
            <>
              <input
                type="text"
                placeholder="College Department"
                value={collegeDepartment}
                onChange={(e) => setCollegeDepartment(e.target.value)}
              />
              <input
                type="text"
                placeholder="Year of Study"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
              />
            </>
          )}
          <br/>
          <button className="sign-button"type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign in</h1>
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
          <br/>
          <button className="sign-button"type="submit">Sign In</button>
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

export default StudentRegistration;