import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import useAuth from '../hooks/useAuth';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.className = 'home-screens';
    return () => {
      document.body.className = ''; // Reset class when unmounting
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setShowPopup(true); // Show popup when signup is clicked

    try {
      // Create a new user
      await API.post('/user/create/', { username, password, email });

      // Automatically log in after signup
      const loginResponse = await API.post('/token/', { username, password });
      login(loginResponse.data.access, loginResponse.data.refresh);

      setShowPopup(false); // Close the popup if signup succeeds
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.response?.data?.error || 'An error occurred during signup.');
      // Keep the popup open for the user to interact with the game
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      <form onSubmit={handleSignup} className="signup-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
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
            disabled={loading}
            required
          />
        </div>
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>

      {/* Popup for backend loading */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Backend Loading...</h2>
            <p>
              The backend is loading and may take a few minutes...while you wait,
              would you like to play a game?
              (If it doesn't load after 2 minutes, check for errors or reload the page!)
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

export default Signup;
