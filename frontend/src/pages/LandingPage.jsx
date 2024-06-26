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
          <div className="card" onClick={() => window.location.href = '/admin/login'}>
            <i className="fas fa-chalkboard-teacher"></i>
            <h2>Teacher</h2>
          </div>
          <div className="card" onClick={() => window.location.href = '/institution/register'}>
            <i className="fas fa-university"></i>
            <h2>Institution</h2>
          </div>
          <div className="card" onClick={() => window.location.href = '/center/register'}>
            <i className="fas fa-building"></i>
            <h2>Center</h2>
          </div>
          <div className="card" onClick={() => window.location.href = '/Admin/login'}>
            <i className="fas fa-lock"></i>
            <h2>Admin</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;