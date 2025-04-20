import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

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
    <nav className="flex items-center justify-between px-4 md:px-14  py-4  border-b   h-full border-gray-300 bg-white sticky top-0 z-50 shadow-sm">
      <NavLink to="/" className="flex-shrink-0">
        <img src={assets.logo} alt="YZ Store Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <NavLink
          to="/"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200"
          activeClassName="text-primary"
        >
          Home
        </NavLink>
        <NavLink
          to="Products"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200"
          activeClassName="text-primary"
        >
          All Products
        </NavLink>
        <NavLink
          to="Contact"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200"
          activeClassName="text-primary"
        >
          Contact
        </NavLink>

        {/* Search Bar - Only on larger screens */}

        <div className="hidden xl:flex items-center w-64 text-sm border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-200">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Search products..."
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
          />
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
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-7 h-7 rounded-full border-2 border-transparent hover:border-primary transition-colors"
              />
              <span className="text-gray-700 text-sm font-medium hidden lg:inline-block">
                My Account
              </span>
            </div>

            {/* Dropdown menu - now controlled by click */}
            {open && (
              <ul
                className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 overflow-hidden z-50 animate-fadeIn"
                ref={(el) => {
                  // Close when clicking outside
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
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
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6 h-6"
        />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-3 px-4 flex flex-col space-y-3 border-t border-gray-200">
          <NavLink
            to="#"
            className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors"
            onClick={() => setOpen(false)}
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/orders"
              className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="#"
            className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>

          {/* Mobile Search */}
          <div className="flex items-center w-full text-sm border border-gray-300 rounded-full px-4 py-2 mt-2">
            <input
              className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
              type="text"
              placeholder="Search products..."
            />
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 opacity-70 ml-2"
            />
          </div>

          {/* Mobile Auth Buttons */}
          <div className="flex space-x-3 mt-3">
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    Navigate("/orders");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                >
                  My Account
                </button>
                <button
                  onClick={logOut}
                  className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-sm font-medium transition-colors"
                >
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
