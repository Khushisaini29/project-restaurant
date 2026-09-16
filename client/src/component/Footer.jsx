import { Link } from "react-router";

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        background: "#171512",
        borderTop: "1px solid #39342e",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand */}
          <div>
            <h2
              style={{
                color: "#FFFFFF",
                fontFamily: "Georgia, serif",
                fontSize: "1.6rem",
              }}
            >
              RÊVE
            </h2>

            <p
              style={{
                color: "#8F887F",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              Fine dining. Beautiful moments.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-8">

            <Link
              to="/"
              style={{
                color: "#8F887F",
                textDecoration: "none",
              }}
            >
              Menu
            </Link>

            <Link
              to="/"
              style={{
                color: "#8F887F",
                textDecoration: "none",
              }}
            >
              About
            </Link>

            <Link
              to="/"
              style={{
                color: "#8F887F",
                textDecoration: "none",
              }}
            >
              Gallery
            </Link>

          </div>

        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid #39342e",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            color: "#666058",
            fontSize: "0.7rem",
          }}
        >
          © {new Date().getFullYear()} Rêve Restaurant. All rights reserved.
        </div>

      </div>
    </footer>
  );
}