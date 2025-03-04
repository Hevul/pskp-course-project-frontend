import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "./styles/app.css";
import { AuthProvider } from "./contexts/AuthContext";
import { StorageProvider } from "./contexts/StorageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StorageProvider>
        <RouterProvider router={router} />
      </StorageProvider>
    </AuthProvider>
  </QueryClientProvider>
);
