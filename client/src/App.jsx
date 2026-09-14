import AppRouter from "./AppRouter";
import AuthStore from "./store/AuthStore";
// import Auth from "../store/AuthStore";
import { useEffect } from "react";
const App = () => {
  const { checkAuthApi } = AuthStore();

  useEffect(() => {
    checkAuthApi();
  }, [checkAuthApi]);
  return <AppRouter />;
};

export default App;