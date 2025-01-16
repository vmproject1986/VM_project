import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the target page from the location state or default to home
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make the login request
      const response = await API.post('/token/', { username, password });

      // Use the login method passed as a prop to set tokens and authentication state
      login(response.data.access, response.data.refresh);

      alert('Login successful!');

      // Redirect the user to the target page
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
