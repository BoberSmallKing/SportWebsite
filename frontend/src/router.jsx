import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import HelpBid from "./pages/HelpBid";
import TeamPage from "./pages/TeamPage";
import FightsPage from "./pages/FightsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },

  /* DASHBOARD LAYOUT */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <TeamPage />   
      },
      {
        path: "team",
        element: <TeamPage />   
      },
      {
        path: "fights",
        element: <FightsPage /> 
      }
    ]
  },

  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/pending",
    element: <HelpBid />
  }
]);

export default router;
