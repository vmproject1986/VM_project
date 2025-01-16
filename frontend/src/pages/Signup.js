import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import useAuth from '../hooks/useAuth';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Create a new user
      await API.post('/user/create/', { username, password, email });
      console.log('Signup successful!');

      // Automatically log in after signup
      const loginResponse = await API.post('/token/', { username, password });
      login(loginResponse.data.access, loginResponse.data.refresh);

      // Redirect to dashboard after successful login
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.response?.data?.error || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </form>
  );
}

export default Signup;
