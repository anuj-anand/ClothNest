import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useData } from "../../contexts";

export const PrivateRoute = ({ children }) => {
  const { token } = useData();
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} replace />
  );
};
