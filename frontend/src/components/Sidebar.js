import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, closeSidebar, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout();
    navigate('/');
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar}></div>
      )}

      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <button className="close-sidebar" onClick={closeSidebar}>
          X
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
    </>
  );
}

export default Sidebar;
