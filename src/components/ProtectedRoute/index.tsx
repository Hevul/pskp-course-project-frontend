import React, { FC, ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { authenticateStatus: isAuthenticated } = useAuth();

  if (isAuthenticated === "Loading") return <h1>loading...</h1>;

  if (isAuthenticated === "Unauthenticated") return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
