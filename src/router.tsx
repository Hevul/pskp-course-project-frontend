import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkplacePage from "./pages/WorkplacePage";
import SecuredPage from "./pages/SecuredPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/workplace", element: <WorkplacePage /> },
  { path: "/secured", element: <SecuredPage /> },
]);

export default router;
