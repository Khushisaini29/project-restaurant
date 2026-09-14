import { PizzaIcon } from "lucide-react";
import { NavLink } from "react-router";
import Auth from "../store/AuthStore";

export default function Header() {
  const { logoutApi, isAdmin } = Auth();

  if (isAdmin == "admin") {
    return (
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-orange-500 inline-flex items-center gap-1"
          >
            <PizzaIcon /> Zwiggy
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <NavLink
              to="/admin/order-history"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-orange-500" : "text-gray-600"}`
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="/admin/explore"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-orange-500" : "text-gray-600"}`
              }
            >
              See All Menu
            </NavLink>

            <NavLink
              to="/admin/create-menu"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-orange-500" : "text-gray-600"}`
              }
            >
              Create Menu
            </NavLink>

            <p
              onClick={() => logoutApi()}
              className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 cursor-pointer"
            >
              Logout
            </p>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-orange-500 inline-flex items-center gap-1"
          >
            <PizzaIcon /> Zwiggy
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-orange-500" : "text-gray-600"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/dashboard/order-history"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-orange-500" : "text-gray-600"}`
              }
            >
              Order History
            </NavLink>

            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-orange-500" : "text-gray-600"}`
              }
            >
              Cart
            </NavLink>

            <p
              onClick={() => logoutApi()}
              className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 cursor-pointer"
            >
              Logout
            </p>
          </nav>
        </div>
      </header>
    );
  }
}