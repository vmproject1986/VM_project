import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './FoodDashBoard.css';
import Sidebar from './Sidebar';
import groceryImage from '../assets/images/grocerylist_dashboard_image.jpg';
import recipeImage from '../assets/images/recipe_dashboard_image.jpg';
import generateImage from '../assets/images/generate_image_FDB.jpg';
import logoImage from '../assets/images/Logo.png'


function FoodDashboard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
      document.body.className = 'food-app';
      return () => {
        document.body.className = ''; // Cleanup on component unmount
      };
    }, []);


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
        <button className="account-icon" onClick={toggleSidebar}>
          <img src={logoImage} alt="Account" className="account-logo" />
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
          <NavLink
            to="/grocery-list"
            className="dashboard-button"
            style={{ backgroundImage: `url(${groceryImage})` }}
          >
            <span>Grocery Lists</span>
          </NavLink>
          <NavLink
            to="/recipes"
            className="dashboard-button"
            style={{ backgroundImage: `url(${recipeImage})` }}
          >
            <span>Recipes</span>
          </NavLink>
          <NavLink
            to="/food-form"
            className="dashboard-button"
            style={{ backgroundImage: `url(${generateImage})` }}
          >
            <span>Generate New List</span>
          </NavLink>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />
    </div>
  );
}

export default FoodDashboard;
