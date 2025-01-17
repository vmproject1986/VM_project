import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import FoodForm from './pages/FoodForm';
import GroceryList from './pages/GroceryList';
import Recipes from './pages/Recipes';
import FoodDashBoard from './components/FoodDashBoard';
import Sidebar from './components/Sidebar';
import HabitDashBoard from './components/HabitDashBoard';
import WellnessDashboard from './components/WellnessDashBoard';
import UnderConstruction from './pages/UnderConstruction';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import Contact from './pages/Contact';


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
          <Route path="/food-form" element={<FoodForm logout={logout}/>} />
          <Route path="/grocery-list" element={<GroceryList logout={logout}/>} />
          <Route path="/recipes"  element={<Recipes logout={logout}/>} />
          <Route path="/food-dashboard" element={<FoodDashBoard logout={logout}/>} />
          <Route path="/sidebar" element={<Sidebar logout={logout} />} />
          <Route path="/habit-dashboard" element={<HabitDashBoard logout={logout} />} />
          <Route path="/wellness-dashboard" element={<WellnessDashboard logout={logout} />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
