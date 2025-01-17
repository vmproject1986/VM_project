import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Dashboard.css';
import Sidebar from './Sidebar';
import habitImage from '../assets/images/habit_image_DB.jpg';
import wellnessImage from '../assets/images/wellness_image_DB.jpg';
import foodImage from '../assets/images/food_image_DB.jpg';

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
        <NavLink
          to="/food-dashboard"
          className="dashboard-button top"
          style={{ backgroundImage: `url(${foodImage})` }}
        >
          <span>Diet & Nutrition</span>
        </NavLink>

        {/* Bottom row */}
        <div className="dashboard-row">
          <NavLink
            to="/wellness-dashboard"
            className="dashboard-button"
            style={{ backgroundImage: `url(${wellnessImage})` }}
          >
            <span>Wellness (under construction)</span>
          </NavLink>
          <NavLink
            to="/habit-dashboard"
            className="dashboard-button"
            style={{ backgroundImage: `url(${habitImage})` }}
          >
            <span>Habits (under construction)</span>
          </NavLink>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />
    </div>
  );
}

export default Dashboard;
