import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Dashboard.css';
import Sidebar from './Sidebar';

function Dashboard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Health Ecosystem</h1>
        <button className="account-icon" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Top container */}
        <NavLink to="/food-dashboard" className="dashboard-button top">
          Diet & Nutrition
        </NavLink>

        {/* Bottom row */}
        <div className="dashboard-row">
          <div className="dashboard-button">Wellness</div>
          <div className="dashboard-button">Habits</div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />
    </div>
  );
}

export default Dashboard;
