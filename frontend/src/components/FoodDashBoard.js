import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './FoodDashBoard.css';
import Sidebar from './Sidebar';
import groceryImage from '../assets/images/grocery_image_FDB.jpg';
import recipeImage from '../assets/images/recipe_image_FDB.jpg';
import generateImage from '../assets/images/generate_image_FDB.jpg';

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
            <span>Generate Grocery List and Recipes</span>
          </NavLink>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />
    </div>
  );
}

export default FoodDashboard;
