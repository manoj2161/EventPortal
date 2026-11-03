import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

const PublicRoute = () => {
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

  return authenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
