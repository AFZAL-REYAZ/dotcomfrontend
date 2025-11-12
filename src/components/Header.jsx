// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

          <button
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Search"
            title="Search"
          >
            <Search className="text-gray-900" size={22} />
          </button>
        </div>

        {/* Center: Brand */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-black font-extrabold text-xl sm:text-2xl tracking-wide uppercase select-none"
        >
          DOTCOM
        </Link>

        {/* Right: Profile + Cart */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/dashboard"
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

      {/* ✅ Sidebar Menu (Left to Right) */}
      <div
        className={`fixed mt-14 top-0 left-0 h-auto bg-white shadow-xl border-r sidebar-menu z-40 transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0 w-[40%]" : "-translate-x-full w-[30%]"
        }`}
      >
        <div className="p-5 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 font-medium"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 font-medium"
          >
            DashBoard
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 font-medium"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 font-medium"
          >
            Login
          </Link>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 font-medium"
          >
            Seting
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
