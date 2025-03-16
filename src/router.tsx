import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Storage from "./pages/Storage/Storage";
import Trouble from "./pages/Trouble/Trouble";

const notFoundTrouble = (
  <Trouble
    code={404}
    header="Страница не найдена"
    description="К сожалению, мы не смогли найти эту страницу. Но зато Вы всегда можете перейти на главную!"
    buttonText="Перейти на главную"
    backUrl="/dashboard"
  />
);

const serverSideTrouble = <Trouble code={500} />;

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/storage", element: <Storage /> },
  { path: "/not-found", element: notFoundTrouble },
  { path: "/server-side-trouble", element: serverSideTrouble },
]);

export default router;
