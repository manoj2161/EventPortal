import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api } from "../../api/axios";
import { Loader } from "./Loader";

export const PublicRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {

    api
      .get("/me")
      .then(() => {
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log("3. API failed:", error.response?.status);
        console.log("4. Error:", error.response?.data || error.message);
        setAuthenticated(false);
      });
  }, []);

  if (authenticated === null) {
    return <Loader />;
  }

  return authenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
