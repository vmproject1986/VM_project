import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout(); // Clear tokens and update state
    navigate('/');
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar}></div>
      )}

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Top container */}
        <div className="dashboard-button top">Diet & Nutrition</div>

        {/* Bottom row */}
        <div className="dashboard-row">
          <div className="dashboard-button">Wellness</div>
          <div className="dashboard-button">Habits</div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <button className="close-sidebar" onClick={closeSidebar}>
          Close Sidebar
        </button>
        <ul>
          <li>Update Preferences</li>
          <li>About</li>
          <li>Pricing</li>
          <li>Contact</li>
          <li>Resources</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
