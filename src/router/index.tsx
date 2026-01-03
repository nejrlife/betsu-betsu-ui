import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";
import ProtectedDashboard from "../components/ProtectedDashboard/ProtectedDashboard";
import Login from "../pages/Login/Login";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/Team/Team";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Tracker from "../pages/Dashboard/Tracker";
import Account from "../pages/Dashboard/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/home",
    element: <ProtectedDashboard />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Tracker />,
          },
          {
            path: "account/:accountId",
            element: <Account />,
          }
        ]
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "team",
        element: <Team />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <ErrorPage error='404 Page not found'/>
  },
]);


export default router;