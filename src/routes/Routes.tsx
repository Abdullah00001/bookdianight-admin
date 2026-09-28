import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import DashboardPage from "@/pages/Dashboard";
import UsersPage from "@/pages/UsersPage";
import ClubOwnersPage from "@/pages/ClubOwnersPage";
import ClubsPage from "@/pages/ClubsPage";
import EventsPage from "@/pages/EventsPage";
import EarningsPage from "@/pages/EarningsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import SettingsPage from "@/pages/SettingsPage";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { GuestGuard } from "@/components/guards/GuestGuard";

const Routes = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/accounts",
        element: <Navigate to="/accounts/users" replace />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/accounts/users",
            element: <UsersPage />,
          },
          {
            path: "/accounts/club-owners",
            element: <ClubOwnersPage />,
          },
          {
            path: "/clubs",
            element: <ClubsPage />,
          },
          {
            path: "/events",
            element: <EventsPage />,
          },
          {
            path: "/earning",
            element: <EarningsPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Route not found</p>
          <a href="/" className="px-6 py-3 bg-[#E5B869] hover:bg-[#D4A353] text-white font-medium rounded-xl transition-colors">
            Return Home
          </a>
        </div>
      </div>
    ),
  },
]);

export default Routes;
