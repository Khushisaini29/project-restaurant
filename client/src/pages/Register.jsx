import { useState } from "react";
import AuthStore from "../store/AuthStore";
import { Link, useNavigate } from "react-router";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function Register() {
  let { SignUpApi } = AuthStore();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
    const result = await SignUpApi(formData);

    if (result) setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <Header />

      {/* Register Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Create an account
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Sign up to get started
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <p className="text-green-600 font-medium">
                Account created successfully!
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Welcome, {formData.name}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.27 3.11 9 7-.27 1.42-.91 2.72-1.83 3.84" />
                        <path d="M6.61 6.61C4.62 7.83 3.2 9.62 3 12c.73 3.89 4 7 9 7 1.61 0 3.03-.34 4.27-.92" />
                        <line x1="3" y1="3" x2="21" y2="21" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.06 12.35a1 1 0 0 1 0-.7C3.9 7.8 7.65 5 12 5c4.35 0 8.1 2.8 9.94 6.65a1 1 0 0 1 0 .7C20.1 16.2 16.35 19 12 19c-4.35 0-8.1-2.8-9.94-6.65Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign up
              </button>

            </form>
          )}

          {/* Login Link - PATH SAME AS YOUR ORIGINAL */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}

            <Link
              to={"/login"}
              className="text-indigo-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}