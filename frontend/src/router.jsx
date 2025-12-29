import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/auth/Logout";
import HelpBid from "./pages/auth/HelpBid";
import TeamPage from "./pages/dashboard/TeamPage";
import CreateFightsPage from "./pages/dashboard/CreateFightsPage";
import FightPage from "./pages/dashboard/FightPage";
import CreateAthletePage from "./pages/dashboard/CreateAthletePage";
import Menu from "./pages/dashboard/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

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
        element: <Menu />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "team",
        element: <TeamPage />,
      },
      {
        path: "fights",
        element: <FightPage />,
      },
      {
        path: "fights/create",
        element: <CreateFightsPage />,
      },
      {
        path: "create-athlete",
        element: <CreateAthletePage />,
      },
    ],
  },

  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/pending",
    element: <HelpBid />,
  },
]);

export default router;
