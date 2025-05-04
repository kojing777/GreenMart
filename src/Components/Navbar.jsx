import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import Groceezy from "../assets/Groceezy.png";
import { toast } from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
    navigate,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]); 

  
  return (
    <nav className="flex items-center justify-between pl-2 pr-8 md:pl-18 md:pr-30 py-8 border-b h-20 border-gray-300 bg-white sticky top-0 z-50 shadow-sm">
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
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base"
        >
          Home
        </NavLink>
        <NavLink
          to="Products"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base"
        >
          All Products
        </NavLink>
        <NavLink
          to="contact"
          className="text-gray-700 hover:text-primary font-medium text-sm lg:text-base"
        >
          Contact
        </NavLink>
        {/* Search Bar */}
        <div className="hidden xl:flex items-center w-64 border border-gray-300 rounded-full px-4 py-2">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Cart Icon */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer group"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute -top-2 -right-3 text-xs font-semibold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* User Auth Section */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors duration-200"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 text-sm font-medium hidden lg:inline-block">
                My Account
              </span>
            </div>

            {open && (
              <ul
                className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 overflow-hidden z-50"
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
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    navigate("/my-orders");
                    setOpen(false);
                  }}
                >
                  My Orders
                </li>
                <li
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >

                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center sm:hidden gap-6">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer group"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute -top-2 -right-3 text-xs font-semibold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary"
        >
          {open ? (
            <svg
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
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-3 px-4 flex flex-col space-y-3 border-t border-gray-200">
          <NavLink
            to="/"
            className="py-2 px-3 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="Products"
            className="py-2 px-3 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/my-orders"
              className="py-2 px-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="Contact"
            className="py-2 px-3 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>

          {/* Mobile Profile */}
          {user && (
            <div className="flex items-center gap-3 mt-3">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-gray-700 text-sm font-medium">
                My Account
              </span>
            </div>
          )}

          {/* Mobile Search */}
          <div className="flex items-center w-full border border-gray-300 rounded-full px-4 py-2 mt-2">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
              type="text"
              placeholder="Search products..."
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
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm"
              >
                Sign In
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/my-orders");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  Account
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-sm"
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
