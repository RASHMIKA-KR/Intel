import { NavLink } from 'react-router-dom';

const ApprovalsPage = () => {
  return (
    <div className="approvals-page">
      <h1>Approvals</h1>
      <NavLink to="/admin/institutions" className="card">
        <h2>Institutions</h2>
      </NavLink>
      <NavLink to="/admin/centers" className="card">
        <h2>Centers</h2>
      </NavLink>
    </div>
  );
};

export default ApprovalsPage;
