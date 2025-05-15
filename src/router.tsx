import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Storage from "./pages/Storage/Storage";
import Trouble from "./pages/Trouble/Trouble";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout";
import DownloadByLink from "./pages/DownloadByLink/DownloadByLink";
import MyLinks from "./pages/MyLinks/MyLinks";

const notFoundTrouble = (
  <Trouble
    code={404}
    header="Страница не найдена"
    description="К сожалению, мы не смогли найти эту страницу. Но зато Вы всегда можете перейти на главную!"
    buttonText="Перейти на главную"
    backUrl="/"
  />
);

const serverSideTrouble = (
  <Trouble
    code={500}
    header="Что-то пошло не так"
    description="К сожалению, мы не смогли обработать этот запрос."
  />
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/not-found", element: notFoundTrouble },
      { path: "/server-side-trouble", element: serverSideTrouble },
      { path: "/link/:link", element: <DownloadByLink /> },
    ],
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/storages", element: <Storage /> },
      { path: "/my-links", element: <MyLinks /> },
    ],
  },
  {
    path: "*",
    element: <PublicLayout />,
    children: [{ path: "*", element: notFoundTrouble }],
  },
]);

export default router;
