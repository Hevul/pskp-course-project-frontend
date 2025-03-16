import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuth } from "../api/auth";
import axios from "axios";

type AuthenticateStatus = "Loading" | "Authenticated" | "Unauthenticated";

interface AuthContextType {
  authenticateStatus: AuthenticateStatus;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [authenticateStatus, setAuthenticateStatus] =
    useState<AuthenticateStatus>("Loading");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = (await axios(checkAuth())).data;
        setAuthenticateStatus(
          response.isAuthenticated ? "Authenticated" : "Unauthenticated"
        );
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthenticateStatus("Unauthenticated");
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticateStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
