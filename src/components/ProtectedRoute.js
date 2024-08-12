import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function ProtectedRoute({ component: Component }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    // Optionally show a loading spinner until auth state is loaded
    return <div>Loading...</div>;
  }

  return isSignedIn ? <Component /> : <Navigate to="/login" />;
}
