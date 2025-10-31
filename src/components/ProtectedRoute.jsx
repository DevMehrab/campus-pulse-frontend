import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProtectedRoute({ allowedRoles }) {
  const { getUser } = useContext(AuthContext);
  const user = JSON.parse(getUser());
  useEffect(() => {
    if (!user) {
      toast.warning("Please log in to continue.", {
        toastId: "auth-warning",
      });
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return <Outlet />;
}
