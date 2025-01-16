import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="landing-container">
      <h1 className="welcome-title">Welcome to your Health Ecosystem</h1>

      <div className="button-container">
        <NavLink to="/login" className="nav-button">
          Login
        </NavLink>
        <NavLink to="/signup" className="nav-button">
          Signup
        </NavLink>
      </div>

      <p className="explanation-message">
        An app to help you on your wellness journey. Click{' '}
        <span
          className="click-here"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          here
        </span>{' '}
        to learn more.
      </p>

      {showExplanation && (
        <p className="explanation-text">
          This application is designed to support you in managing your health,
          including tracking your diet, habits, and wellness goals. We're here to
          help you on your journey to a healthier life!
        </p>
      )}
    </div>
  );
}

export default LandingPage;
