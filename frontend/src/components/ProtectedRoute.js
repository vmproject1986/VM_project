import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

    console.log(isAuthenticated);
    console.log(loading);

  if (loading) {
    // Prevent premature redirects while authentication state is loading
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
