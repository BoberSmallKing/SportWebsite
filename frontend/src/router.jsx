import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/auth/Logout";
import HelpBid from "./pages/auth/HelpBid";
import TeamPage from "./pages/dashboard/TeamPage";
import FightsPage from "./pages/dashboard/FightsPage";
import CreateAthletePage from "./pages/dashboard/CreateAthletePage";

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
      },
      {
        path: "create-athlete",
        element: <CreateAthletePage />   
      },
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
