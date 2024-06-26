import { useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import '../../assets/AdminLogin.css';
import { Context } from "../../main";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const handleAdminLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/login',
        { username, password}
      );
      if (response.data.success) {
        toast.success(response.data.message);
        clearSignInFields();
        setIsAuthorized(true);
      }
       
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Admin login failed. Please try again.'
      );
    }
  };
  const clearSignInFields = () => {
    setUsername("");
    setPassword("");
  };
  if (isAuthorized) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleAdminLogin}>
          <h1>Admin Sign In</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminLogin;
