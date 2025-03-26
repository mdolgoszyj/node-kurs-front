
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./isTokenValid";

const ProtectedRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
