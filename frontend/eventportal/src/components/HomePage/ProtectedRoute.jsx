import { api } from "../../api/axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
