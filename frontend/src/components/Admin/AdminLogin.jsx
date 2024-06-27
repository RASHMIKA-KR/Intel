import { useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { Context } from "../../main";
import "../../assets/AdminLogin.css";
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/login',
        { username, password }
      );
      if (response.data.success) {
        const token = response.data.token;
        if (token) {
          Cookies.set('authToken', token, { expires: 1 }); // Set the token as a cookie
          toast.success(response.data.message);
          clearLoginFields();
          setIsAuthorized(true);
        } else {
          toast.error("No token received. Please try again.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const clearLoginFields = () => {
    setUsername("");
    setPassword("");
  };

  if (isAuthorized) {
    return <Navigate to="/admin/home" />;
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-form-wrapper">
        <form onSubmit={handleAdminLogin} className="admin-login-form">
          <h1>Admin Sign In</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="admin-login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-login-input"
          />
          <button type="submit" className="admin-login-button">Sign In</button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminLogin;
