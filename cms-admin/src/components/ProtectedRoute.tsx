import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function ProtectedRoute() {
  const { authed } = useAuth();
  if (!authed) return <Navigate to="/login" replace />;
  return <Outlet />;
}
