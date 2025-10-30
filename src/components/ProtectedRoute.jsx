import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { getUser } = useContext(AuthContext);
  const user = JSON.parse(getUser());

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return <Outlet />;
}
