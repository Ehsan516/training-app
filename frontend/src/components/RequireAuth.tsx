import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactElement } from "react";


export default function RequireAuth({ children }: { children: ReactElement }) { //only logged-in users can access them
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;  //redirect to login, preserve where the user tried to go
  }

  return children;
}
