// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
   
  // 👈 Get user from Redux (NOT localStorage)
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if clicked outside sidebar and button
      if (
        !event.target.closest(".sidebar-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      // Use 'mousedown' instead of 'click' for better timing
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);


  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between relative">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-button p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Open menu"
            title="Menu"
          >
            {menuOpen ? (
              <X className="text-gray-900" size={22} />
            ) : (
              <Menu className="text-gray-900" size={22} />
            )}
          </button>

          
        </div>

        {/* Center: Brand */}
        {/* <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-black font-extrabold text-xl sm:text-2xl tracking-wide uppercase select-none"
        >
          DOTCOM
        </Link> */}
        {/* Search bar */}
      <div className="flex flex-row sm:flex-row gap-3">
        <div className="relative flex-1">
          <button
            aria-label="scan"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full "
          >
            <Search className="text-gray-900" size={15} />
          </button>
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full border text-black border-gray-200 rounded-full py-1 pl-10 pr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          
        </div>
      </div>

        {/* Right: Profile + Cart */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/profile"
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Account"
            title="Account"
          >
            <User className="text-gray-900" size={22} />
          </Link>

          <Link
            to="/addtocart"
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingBag className="text-gray-900" size={22} />
          </Link>
        </div>
      </div>

      {/* ✅ Sidebar Menu (Left to Right – Professional Look) */}
      <div
        className={`fixed top-0 left-0 h-[97%] bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-200 sidebar-menu z-40 transition-all duration-300 ease-in-out ${menuOpen ? "translate-x-0 w-[70%] sm:w-[40%] md:w-[30%]" : "-translate-x-full w-[70%]"
          }`}
      >
        {/* Top Section – Brand */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="text-lg font-extrabold text-white tracking-wider">DOTCOM</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-200 hover:text-white transition"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col p-5 gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-800 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            🏠 <span>Home</span>
          </Link>

          {user?.role === "admin" && (
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-800 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            📊 <span>Dashboard</span>
          </Link>
          )}


          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-800 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            📝 <span>Sign Up</span>
          </Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-800 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            🔐 <span>Login</span>
          </Link>

          <Link
            to="/settings"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-gray-800 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            ⚙️ <span>Settings</span>
          </Link>
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-4 left-0 w-full text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DOTCOM. All rights reserved.
        </div>
      </div>

    </header>
  );
};

export default Header;
