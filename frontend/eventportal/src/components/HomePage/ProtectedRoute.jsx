import { api } from "../../api/axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./Loader";

export const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    api
      .get("/me")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <Loader />;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
