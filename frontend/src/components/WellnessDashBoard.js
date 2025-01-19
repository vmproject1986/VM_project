import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import wellnessImage from '../assets/images/wellness_image_DB.jpg';
import './WellnessDashBoard.css';

function WellnessDashboard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const closeSidebar = () => {
  //   setIsSidebarOpen(false);
  // };

  return (
    <div className="wellness-dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Wellness Ecosystem</h1>
        <button className="account-icon" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Back to Health Ecosystem Button */}
      <div className="back-button-container">
        <NavLink to="/dashboard" className="back-button">
          Back to Health Ecosystem
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Single row with two larger containers */}
        <div className="dashboard-row">
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Water Intake</span>
          </NavLink>
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Sleep</span>
          </NavLink>
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Meditation</span>
          </NavLink>
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Exercise</span>
          </NavLink>
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Mood</span>
          </NavLink>
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Generate Analysis</span>
          </NavLink>

        </div>
      </div>
    </div>
  );
}

export default WellnessDashboard;
