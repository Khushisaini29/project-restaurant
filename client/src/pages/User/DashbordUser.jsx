import { Outlet } from "react-router";
import Header from "../../component/Header.jsx";
import Footer from "../../component/Footer.jsx";
const DashbordUser = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashbordUser;