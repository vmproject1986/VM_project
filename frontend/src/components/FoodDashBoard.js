import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './FoodDashBoard.css';
import Sidebar from './Sidebar';

function FoodDashboard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="food-dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Food Ecosystem</h1>
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
        {/* Single row with three larger containers */}
        <div className="dashboard-row">
          <NavLink to="/grocery-list" className="dashboard-button">
            Grocery Lists
          </NavLink>
          <NavLink to="/recipes" className="dashboard-button">
            Recipes
          </NavLink>
          <NavLink to="/food-form" className="dashboard-button">
            Generate Grocery List and Recipes
          </NavLink>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />
    </div>
  );
}

export default FoodDashboard;
