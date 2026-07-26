import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;