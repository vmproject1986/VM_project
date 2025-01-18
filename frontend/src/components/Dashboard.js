import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Dashboard.css';
import Sidebar from './Sidebar';
import habitImage from '../assets/images/habit_image_DB.png';
import wellnessImage from '../assets/images/wellness_image_DB.jpg';
import foodImage from '../assets/images/food_image_DB.jpg';
import logoImage from '../assets/images/Logo.png';


function Dashboard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.className = 'home-screens';
    return () => {
      document.body.className = ''; // Reset class when unmounting
    };
  }, []);

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
          <img src={logoImage} alt="Account" className="account-logo" />
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
          <span>Food & Nutrition</span>
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
