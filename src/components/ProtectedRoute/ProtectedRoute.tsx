import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";
import axios from "axios";
import { checkAuth } from "../../api/auth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      setIsLoading(true);

      try {
        const response = (await axios(checkAuth())).data;
        setIsAuthenticated(response.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    fetchMe();
  }, []);

  if (isLoading) return <div className={styles.null} />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
