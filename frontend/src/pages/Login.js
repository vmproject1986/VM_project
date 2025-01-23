import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import API from '../api';
import './Login.css';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.className = 'home-screens';
    return () => {
      document.body.className = ''; // Reset class when unmounting
    };
  }, []);

  // Get the target page from the location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setShowPopup(true); // Show the popup when login is clicked

    try {
      const response = await API.post('/token/', { username, password });

      // Use the login method passed as a prop
      login(response.data.access, response.data.refresh);

      setShowPopup(false); // Close the popup if login succeeds
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
      // Keep the popup open for the user to interact with the game
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signup-section">
        <p className="signup-text">Don't have an account?</p>
        <NavLink to="/signup" className="signup-button">
          Signup
        </NavLink>
      </div>

      {/* Popup for backend loading */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Backend Loading</h2>
            <p>
              The backend is loading and may take a few minutes...while you wait,
              would you like to play a game?
            </p>
            {/* Embed an external website */}
            <iframe
              src="https://doakmath.github.io/wesleys-dog-game/"
              title="Embedded Game"
              className="game-iframe"
            ></iframe>
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
