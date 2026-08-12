import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import DashboardPage from "@/pages/Dashboard";
import UsersPage from "@/pages/UsersPage";
import ClubOwnersPage from "@/pages/ClubOwnersPage";
import { DashboardLayout } from "@/layouts/DashboardLayout";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/accounts",
    element: <Navigate to="/accounts/users" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "accounts/users",
        element: <UsersPage />,
      },
      {
        path: "accounts/club-owners",
        element: <ClubOwnersPage />,
      },
    ],
  },
]);

export default Routes;
