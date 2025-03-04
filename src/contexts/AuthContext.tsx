import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { login as apiLogin, logout as apiLogout, checkAuth } from "../api/auth";
import axios from "axios";

type AuthenticateStatus = "Loading" | "Authenticated" | "Unauthenticated";

interface AuthContextType {
  authenticateStatus: AuthenticateStatus;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

  const login = async (username: string, password: string) => {
    await axios(apiLogin(username, password));
    setAuthenticateStatus("Authenticated");
  };

  const logout = async () => {
    await axios(apiLogout());
    setAuthenticateStatus("Unauthenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateStatus,
        login,
        logout,
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
