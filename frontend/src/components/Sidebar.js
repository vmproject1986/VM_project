import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import About from '../pages/About';
import Pricing from '../pages/Pricing';
import Resources from '../pages/Resources';

function Sidebar({ isSidebarOpen, closeSidebar, logout }) {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is active

    const handleLogout = () => {
        console.log('Logout button clicked');
        logout();
        navigate('/');
    };

    const toggleDropdown = (item) => {
        if (activeDropdown === item) {
            setActiveDropdown(null); // Close the dropdown if already open
        } else {
            setActiveDropdown(item); // Open the clicked dropdown
        }
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
                    <li onClick={() => toggleDropdown('about')}>
                        About
                        {activeDropdown === 'about' && (
                            <div className="dropdown">
                                <About />
                            </div>
                        )}
                    </li>
                    <li onClick={() => toggleDropdown('pricing')}>
                        Pricing
                        {activeDropdown === 'pricing' && (
                            <div className="dropdown">
                                <Pricing />
                            </div>
                        )}
                    </li>
                    <li onClick={() => toggleDropdown('contact')}>
                        Feedback
                        {activeDropdown === 'contact' && (
                            <div className="dropdown">
                                <p>Please share your thoughts!  Your Feedback is super helpful to make your experience even better!</p>
                            <button
                              className="feedback-button"
                              onClick={() => navigate('/contact')}
                            >
                              Feedback
                            </button>
                          </div>
                        )}
                    </li>
                    <li onClick={() => toggleDropdown('resources')}>
                        Resources
                        {activeDropdown === 'resources' && (
                            <div className="dropdown">
                                <Resources />
                            </div>
                        )}
                    </li>
                </ul>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    );
}

export default Sidebar;
