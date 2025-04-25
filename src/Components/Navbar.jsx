import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import Groceezy from "../assets/Groceezy.png";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin, setSearchQuery, searchQuery } =
    useAppContext();
  const Navigate = useNavigate();

  const logOut = async () => {
    setUser(null);
    Navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      Navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-14 py-5 border-b h-20 border-gray-300 bg-white sticky top-0 z-50 shadow-sm">
      <NavLink
        to="/"
        className="flex-shrink-0 h-20 w-auto ml-0 md:ml-12 mr- md:mr-8"
      >
        <img
          src={Groceezy}
          alt="Groceezy Logo"
          className="h-full w-auto object-contain"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <NavLink
          to="/"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200 flex items-center gap-1"
          activeclassname="text-primary"
        >
          Home
        </NavLink>
        <NavLink
          to="ButtomBanner"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200 flex items-center gap-1"
          activeclassname="text-primary"
        >
          Features
        </NavLink>
        <NavLink
          to="Products"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200 flex items-center gap-1"
          activeclassname="text-primary"
        >
          All Products
        </NavLink>

        {/* Search Bar - Only on larger screens */}
        <div className="hidden xl:flex items-center w-64 text-sm border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-200">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Search products..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer group">
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute -top-2 -right-3 text-xs font-semibold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Auth Section */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center gap-1"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-700 hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-700 text-sm font-medium hidden lg:inline-block">
                My Account
              </span>
            </div>

            {/* Dropdown menu */}
            {open && (
              <ul
                className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 overflow-hidden z-50 animate-fadeIn"
                ref={(el) => {
                  const handleClickOutside = (event) => {
                    if (
                      el &&
                      !el.contains(event.target) &&
                      !event.target.closest(".relative")
                    ) {
                      setOpen(false);
                    }
                  };
                  document.addEventListener("mousedown", handleClickOutside);
                  return () =>
                    document.removeEventListener(
                      "mousedown",
                      handleClickOutside
                    );
                }}
              >
                <li
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition-colors flex items-center gap-2"
                  onClick={() => {
                    Navigate("/orders");
                    setOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  My Orders
                </li>
                <li
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors flex items-center gap-2"
                  onClick={() => {
                    logOut();
                    setOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-3 px-4 flex flex-col space-y-3 border-t border-gray-200">
          <NavLink
            to="/"
            className="py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </NavLink>
          <NavLink
            to="Products"
            className=" py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/orders"
              className=" py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              My Orders
            </NavLink>
          )}
          <NavLink
            to="Contact"
            className=" py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact
          </NavLink>

          {/* Mobile Search */}
          <div className="flex items-center w-full text-sm border border-gray-300 rounded-full px-4 py-2 mt-2">
            <input
              className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
              type="text"
              placeholder="Search products..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="flex space-x-3 mt-3">
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign In
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    Navigate("/orders");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Account
                </button>
                <button
                  onClick={logOut}
                  className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
