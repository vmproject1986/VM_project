import { NavLink } from "react-router-dom";

function UnderConstruction() {
  return (
    <div className="under-construction-container">
      <h1>Under Construction</h1>
      <p>This page is under construction. Please check back later.</p>
      <NavLink to="/dashboard" className="back-button">
        Back to Health Ecosystem
      </NavLink>
    </div>
  );
}

export default UnderConstruction;
