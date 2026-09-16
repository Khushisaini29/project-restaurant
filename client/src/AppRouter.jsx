import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import Protector from "./component/Protector.jsx";
import GuestRoute from "./component/GuestRoute.jsx";
import RoleRouter from "./component/RoleRouter.jsx";

import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

import UserDashboard from "./pages/User/DashbordUser.jsx";
import Explore from "./pages/User/Explore.jsx";
import Cart from "./pages/User/Cart.jsx";
import Orders from "./pages/User/Orders.jsx";

import ExploreAdmin from "./pages/Admin/Explore.jsx";
import CreateMenu from "./pages/Admin/CreateMenu.jsx";
import OrderPage from "./pages/Admin/OrderPage.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            GUEST ROUTES
        ===================================================== */}

        <Route element={<GuestRoute />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<Register />} />

          <Route path="/login" element={<Login />} />
        </Route>


        {/* =====================================================
            PROTECTED ROUTES
        ===================================================== */}

        <Route element={<Protector />}>

          {/* =================================================
              USER DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard"
            element={<UserDashboard />}
          >
            {/* /dashboard */}
            <Route
              index
              element={<Explore />}
            />

            {/* /dashboard/cart */}
            <Route
              path="cart"
              element={<Cart />}
            />

            {/* /dashboard/order-history */}
            <Route
              path="order-history"
              element={<Orders />}
            />
          </Route>


          {/* =================================================
              ADMIN ROUTES
          ================================================= */}

          <Route
            path="/admin"
            element={<RoleRouter />}
          >

            {/* ---------------------------------------------
                Admin Explore
                /admin/explore
            --------------------------------------------- */}

            <Route
              path="explore"
              element={
                <div className="flex min-h-screen flex-col bg-[#F8F3EA]">

                  <Header />

                  <main className="flex-1">
                    <ExploreAdmin />
                  </main>

                  <Footer />

                </div>
              }
            />


            {/* ---------------------------------------------
                Create Menu
                /admin/create-menu
            --------------------------------------------- */}

            <Route
              path="create-menu"
              element={
                <div className="flex min-h-screen flex-col bg-[#F8F3EA]">

                  <Header />

                  <main className="flex-1">
                    <CreateMenu />
                  </main>

                  <Footer />

                </div>
              }
            />


            {/* ---------------------------------------------
                Update Menu
                /admin/create-menu/:id
            --------------------------------------------- */}

            <Route
              path="create-menu/:id"
              element={
                <div className="flex min-h-screen flex-col bg-[#F8F3EA]">

                  <Header />

                  <main className="flex-1">
                    <CreateMenu />
                  </main>

                  <Footer />

                </div>
              }
            />


            {/* ---------------------------------------------
                Admin Orders
                /admin/order-history
            --------------------------------------------- */}

            <Route
              path="order-history"
              element={
                <div className="flex min-h-screen flex-col bg-[#F8F3EA]">

                  <Header />

                  <main className="flex-1">
                    <OrderPage />
                  </main>

                  <Footer />

                </div>
              }
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;