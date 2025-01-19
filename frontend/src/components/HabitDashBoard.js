import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import habitImage from '../assets/images/habit_image_DB.png';
import './HabitDashBoard.css';

function HabitDashBoard({ logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const closeSidebar = () => {
  //   setIsSidebarOpen(false);
  // };

  return (
    <div className="habit-dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Habit Ecosystem</h1>
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
            style={{ backgroundImage: `url(${habitImage})` }}
          >
            <span>Habit Tracker</span>
          </NavLink>
          <NavLink
            to="/under-construction"
            className="dashboard-button"
            style={{ backgroundImage: `url(${habitImage})` }}
          >
            <span>Add a Habit</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HabitDashBoard;
