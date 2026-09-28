import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useCheckAuthQuery } from "@/apis/auth.api";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AuthGuard() {
  const location = useLocation();
  const { isAuthenticated, setAuth, clearAuth } = useAuthStore();
  
  const { data, isError, isLoading, isSuccess } = useCheckAuthQuery();

  useEffect(() => {
    if (isSuccess && data?.success) {
      const currentToken = useAuthStore.getState().csrfToken;
      setAuth(data.data, data.csrfToken || currentToken || "");
    }
  }, [isSuccess, data, setAuth]);

  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, clearAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
