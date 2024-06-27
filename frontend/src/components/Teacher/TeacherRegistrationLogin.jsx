import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import "../../assets/TeacherRegistration.css";
import { Context } from "../../main";

const TeacherRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [subjectOrDepartment, setSubjectOrDepartment] = useState("");
  const [domain, setDomain] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/teacher/register",
        {
          name,
          email,
          password,
          gender,
          address,
          age,
          phone,
          institutionType,
          institutionDetails: {
            school: {
              name: institutionType === "School" ? institutionName : undefined,
              subject: institutionType === "School" ? subjectOrDepartment : undefined,
            },
            college: {
              name: institutionType === "College" ? institutionName : undefined,
              department: institutionType === "College" ? subjectOrDepartment : undefined,
            },
            center: {
              name: institutionType === "Center" ? institutionName : undefined,
              domain: institutionType === "Center" ? domain : undefined,
            },
          },
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
        "http://localhost:4000/api/teacher/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        clearSignInFields();
        setIsAuthorized(true);
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
    setSubjectOrDepartment("");
    setDomain("");
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
    return <Navigate to={"/teacher/home"} />;
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
          <select
            className="select-dropdown"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
            <option value="Center">Center</option>
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
              placeholder="Subject"
              value={subjectOrDepartment}
              onChange={(e) => setSubjectOrDepartment(e.target.value)}
            />
          )}
          {institutionType === "College" && (
            <input
              type="text"
              placeholder="Department"
              value={subjectOrDepartment}
              onChange={(e) => setSubjectOrDepartment(e.target.value)}
            />
          )}
          {institutionType === "Center" && (
            <input
              type="text"
              placeholder="Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          )}
          <br />
          <button type="submit">Sign Up</button>
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
          <br />
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

export default TeacherRegistration;
