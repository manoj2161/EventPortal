import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api } from "../../api/axios";

export const PublicRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    console.log("1. PublicRoute mounted");
    console.log("2. API URL:", api.defaults.baseURL);

    api
      .get("/me")
      .then((response) => {
        console.log("3. API success:", response.status, response.data);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log("3. API failed:", error.response?.status);
        console.log("4. Error:", error.response?.data || error.message);
        setAuthenticated(false);
      });
  }, []);

  if (authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  return authenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
