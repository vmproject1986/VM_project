import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true); // Token is valid
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsAuthenticated(false); // Token is expired
        }
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false); // Invalid token
      }
    } else {
      setIsAuthenticated(false); // No token found
    }
    setLoading(false); // Validation complete
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };


  console.log(isAuthenticated);
  console.log(loading);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup login={login} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} />}>
          <Route path="/user-list" element={<UserList />} />
          <Route path="/dashboard" element={<Dashboard logout={logout} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
