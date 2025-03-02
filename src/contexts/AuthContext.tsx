import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import loginApi from "../api/loginApi";
import logoutApi from "../api/logoutApi";
import checkAuthApi from "../api/checkAuthApi";

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
    const checkAuth = async () => {
      try {
        const response = await checkAuthApi();
        setAuthenticateStatus(
          response.isAuthenticated ? "Authenticated" : "Unauthenticated"
        );
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthenticateStatus("Unauthenticated");
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    await loginApi(username, password);
    setAuthenticateStatus("Authenticated");
  };

  const logout = async () => {
    await logoutApi();
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
