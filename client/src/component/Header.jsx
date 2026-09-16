import { NavLink } from "react-router";
import Auth from "../store/AuthStore";

const colors = {
  dark: "#171512",
  gold: "#C89B5D",
  goldLight: "#E3C58E",
  white: "#FFFFFF",
  muted: "#8F887F",
};

export default function Header() {
  const { logoutApi, isAdmin } = Auth();

  // =========================
  // ADMIN HEADER
  // =========================
  if (isAdmin === "admin") {
    return (
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(23,21,18,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                border: `1px solid ${colors.gold}`,
                color: colors.gold,
                fontFamily: "serif",
                fontSize: "1.1rem",
              }}
            >
              R
            </div>

            <div>
              <div
                style={{
                  color: colors.white,
                  fontFamily: "Georgia, serif",
                  fontSize: "1.25rem",
                  letterSpacing: "0.04em",
                }}
              >
                RÊVE
              </div>

              <div
                style={{
                  color: colors.gold,
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                }}
              >
                RESTAURANT
              </div>
            </div>
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-8">

            <NavLink
              to="/admin/order-history"
              style={({ isActive }) => ({
                color: isActive ? colors.gold : "#ddd5ca",
                textDecoration: "none",
                fontSize: "0.9rem",
              })}
            >
              Orders
            </NavLink>

            <NavLink
              to="/admin/explore"
              style={({ isActive }) => ({
                color: isActive ? colors.gold : "#ddd5ca",
                textDecoration: "none",
                fontSize: "0.9rem",
              })}
            >
              See All Menu
            </NavLink>

            <NavLink
              to="/admin/create-menu"
              style={({ isActive }) => ({
                color: isActive ? colors.gold : "#ddd5ca",
                textDecoration: "none",
                fontSize: "0.9rem",
              })}
            >
              Create Menu
            </NavLink>

            <button
              onClick={() => logoutApi()}
              style={{
                background: colors.gold,
                color: colors.dark,
                border: "none",
                padding: "0.75rem 1.25rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>

          </nav>
        </div>
      </header>
    );
  }

  // =========================
  // USER HEADER
  // =========================
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(23,21,18,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              border: `1px solid ${colors.gold}`,
              color: colors.gold,
              fontFamily: "serif",
              fontSize: "1.1rem",
            }}
          >
            R
          </div>

          <div>
            <div
              style={{
                color: colors.white,
                fontFamily: "Georgia, serif",
                fontSize: "1.25rem",
                letterSpacing: "0.04em",
              }}
            >
              RÊVE
            </div>

            <div
              style={{
                color: colors.gold,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
              }}
            >
              RESTAURANT
            </div>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              color: isActive ? colors.gold : "#ddd5ca",
              textDecoration: "none",
              fontSize: "0.9rem",
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/order-history"
            style={({ isActive }) => ({
              color: isActive ? colors.gold : "#ddd5ca",
              textDecoration: "none",
              fontSize: "0.9rem",
            })}
          >
            Order History
          </NavLink>

          <NavLink
            to="/dashboard/cart"
            style={({ isActive }) => ({
              color: isActive ? colors.gold : "#ddd5ca",
              textDecoration: "none",
              fontSize: "0.9rem",
            })}
          >
            Cart
          </NavLink>

          <button
            onClick={() => logoutApi()}
            style={{
              background: colors.gold,
              color: colors.dark,
              border: "none",
              padding: "0.75rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>

        </nav>
      </div>
    </header>
  );
}