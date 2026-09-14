import { Navigate, Outlet } from "react-router";
import Auth from "../store/AuthStore";

const GuestRoute = () => {
  const { userData } = Auth();
  console.log(userData);
  if (userData) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default GuestRoute;