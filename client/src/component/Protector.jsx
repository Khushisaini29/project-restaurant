import { Outlet, Navigate } from "react-router";
import Auth from "../store/AuthStore";

const Protector = () => {
  const { userData } = Auth();

  console.log(userData);
  if (!userData) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default Protector;