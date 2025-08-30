import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally show a loader while checking auth
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the children
  return children;
};

export default PrivateRoute;
