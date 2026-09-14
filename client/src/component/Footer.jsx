import { Mail, MapPin, Phone, PizzaIcon } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-orange-500 inline-flex items-center gap-1"
          >
            <PizzaIcon /> Zwiggy
          </Link>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            Delicious food delivered straight to your doorstep.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>

          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>

            <Link to="/menu" className="hover:text-orange-500">
              Menu
            </Link>

            <Link to="/cart" className="hover:text-orange-500">
              Cart
            </Link>

            <Link to="/login" className="hover:text-orange-500">
              Login
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>

          <div className="space-y-2 text-sm text-gray-400 flex flex-col gap-2">
            <p className="inline-flex items-center gap-1">
              <MapPin /> Delhi, India
            </p>
            <p className="inline-flex items-center gap-1">
              <Mail /> support@foodapp.com
            </p>
            <p className="inline-flex items-center gap-1">
              <Phone /> +91 98765 43210
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FoodApp. All rights reserved.
      </div>
    </footer>
  );
}