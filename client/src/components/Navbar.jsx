import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17V5a1 1 0 011-1h5a1 1 0 011 1v12M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-2-2h-6m6 0V9a1 1 0 00-1-1h-4"
            />
          </svg>
          <span className="text-2xl font-extrabold text-white drop-shadow">
            QuickDeliver Lite
          </span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex ${
            isOpen ? "flex" : "hidden"
          } md:items-center md:space-x-6 w-full md:w-auto md:static absolute top-full left-0 bg-black md:bg-transparent px-6 py-4 md:py-0`}
        >
          <Link
            to="/"
            className="text-white hover:text-yellow-200 font-semibold transition py-2"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-white hover:text-yellow-200 font-semibold transition py-2"
          >
            Dashboard
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-200 font-semibold transition py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-yellow-200 font-semibold transition py-2"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="text-yellow-100 text-sm font-medium py-2">
                Hi, {user.name}
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="ml-0 md:ml-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold shadow transition"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
