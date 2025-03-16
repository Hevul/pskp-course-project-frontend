import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { checkAuth } from "../../api/auth";
import styles from "./ProtectedRoute.module.css";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { response, sendRequest, loading } = useAxios();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    sendRequest(checkAuth());
  }, []);

  useEffect(() => {
    try {
      const isAuth = response?.data?.isAuthenticated;
      setIsAuth(isAuth);
    } catch {
      setIsAuth(false);
    }
  }, [response]);

  if (!isAuth) <Navigate to="/login" />;

  if (loading) return <div className={styles.null}></div>;

  return <div>{children}</div>;
};

export default ProtectedRoute;
