import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "./styles/app.css";
import { AuthProvider } from "./contexts/AuthContext";
import { StorageProvider } from "./contexts/StorageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <StorageProvider>
      <RouterProvider router={router} />
    </StorageProvider>
  </AuthProvider>
);
