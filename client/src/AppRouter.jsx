import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
// import Dasboard from "./libs/Dashbord.jsx";
import Protector from "./component/Protector.jsx";
import Footer from "./component/Footer.jsx";
import Header from "./component/Header.jsx";
import Explore from "./pages/User/Explore.jsx";
import ExploreAdmin from "./pages/Admin/Explore.jsx";
import GuestRoute from "./component/GuestRoute.jsx";
import RoleRouter from "./component/RoleRouter.jsx";
import CreateMenu from "./pages/Admin/CreateMenu.jsx";
import UserDashboard from "./pages/User/DashbordUser.jsx";
import Cart from "./pages/User/Cart.jsx";
import Orders from "./pages/User/Orders.jsx";
import OrderPage from "./pages/Admin/OrderPage.jsx";
const AppRouter = () => {
  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Route>

          {/* <Route path="/explore" element={<Explore />} /> */}
          <Route element={<Protector />}>
            {/* <Route
              path="/dashboard"
              element={
                <>
                  <Header />
                  <Dasboard />
                  <Footer />
                </>
              }
            /> */}
            <Route path="/dashboard" element={<UserDashboard />}>
              <Route index element={<Explore />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order-history" element={<Orders />} />
            </Route>
            <Route path="/admin" element={<RoleRouter />}>
              <Route
                path="explore"
                element={
                  <>
                    <Header />
                    <ExploreAdmin />
                    <Footer />
                  </>
                }
              />
              <Route
                path="create-menu"
                element={
                  <>
                    <Header />
                    <CreateMenu />
                    <Footer />
                  </>
                }
              />
              <Route
                path="create-menu/:id"
                element={
                  <>
                    <Header />
                    <CreateMenu />
                    <Footer />
                  </>
                }
              />
              <Route
                path="order-history"
                element={
                  <>
                    <Header />
                    <OrderPage />
                    <Footer />
                  </>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;