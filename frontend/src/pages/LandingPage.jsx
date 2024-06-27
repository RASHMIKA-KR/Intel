import '../assets/LandingPage.css';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Education</h1>
      </header>
      <main>
        <div className="card-container">
          <div className="card">
            <Link to="/student/register">
              <i className="fas fa-user"></i>
              <h2>Student</h2>
            </Link>
          </div>
          <div className="card" >
            <Link to="/teacher/register">
              <i className="fas fa-user"></i>
              <h2>Teacher</h2>
            </Link>
          </div>
          <div className="card" >
          <Link to="/institution/register">
              <i className="fas fa-user"></i>
              <h2>Institution</h2>
            </Link>
          </div>
          <div className="card" >
          <Link to="/center/register">
              <i className="fas fa-user"></i>
              <h2>Center</h2>
            </Link>
            
          </div>
          <div className="card">
            <Link to="/admin/login">
              <i className="fas fa-user"></i>
              <h2>Admin</h2>
            </Link>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;