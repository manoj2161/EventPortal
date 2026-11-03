import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../api/axios";
export const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    try {
      const response = api.get("/api/auth/mr");
      if (response) {
        () => setAuthenticated(true);
      }
      if (authenticated === null) {
        return <p>Checking authenticatino...</p>;
      }
      return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
    } catch (error) {
      console.log(error);
      () => setAuthenticated(false);
    }
  }, []);
  return <></>;
};
