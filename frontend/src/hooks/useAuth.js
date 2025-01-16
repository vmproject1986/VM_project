import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && typeof token === 'string') {
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
        console.error('Invalid token:', error);
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
    console.log('Is Authenticated:', isAuthenticated);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  };
}

export default useAuth;
