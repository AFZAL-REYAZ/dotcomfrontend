// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag, LogOut, LogIn } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const { user } = useSelector((state) => state.auth);

  /* Close menu on outside click */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest(".sidebar-menu") &&
        !e.target.closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b shadow-sm">
      {/* ================= TOP BAR ================= */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">

        {/* Left */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-button p-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Search */}
        <div className="relative w-full max-w-sm mx-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/products?search=${searchText}`);
                setMenuOpen(false);
              }
            }}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-200 py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link className="p-2 rounded-lg hover:bg-gray-100 text-gray-700" to="/profile">
            <User size={22} />
          </Link>
          <Link className="p-2 rounded-lg hover:bg-gray-100 text-gray-700" to="/addtocart">
            <div className="relative">
              <ShoppingBag size={22} />

              {/* Cart Badge */}
              {cartCount > 0 && (
                <span className="
                    absolute -top-2 -right-2
                    bg-red-600 text-white
                    text-[10px] font-bold
                    h-5 min-w-[20px]
                    px-1 rounded-full
                    flex items-center justify-center
                  ">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full bg-white sidebar-menu shadow-2xl z-40 transition-transform duration-300
        ${menuOpen ? "translate-x-0 w-[75%] sm:w-[45%] md:w-[30%]" : "-translate-x-full w-[75%]"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-white font-bold text-lg tracking-wide">
            DOTCOM
          </h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white opacity-80 hover:opacity-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <div className="p-6 space-y-2 text-sm">

          <MenuItem to="/" icon="🏠" label="Home" close={setMenuOpen} />

          {user?.role === "admin" && (
            <MenuItem to="/dashboard" icon="📊" label="Dashboard" close={setMenuOpen} />
          )}

          {!user && (
            <MenuItem
              to="/login"
              icon={<LogIn size={16} />}
              label="Login"
              close={setMenuOpen}
              highlight="blue"
            />
          )}

          {user && (
            <>
              <MenuItem to="/settings" icon="⚙️" label="Settings" close={setMenuOpen} />

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setMenuOpen(false);
                  window.location.href = "/login";
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-500">
          © {new Date().getFullYear()} DOTCOM
        </div>
      </div>
    </header>
  );
};

/* ================= REUSABLE MENU ITEM ================= */
function MenuItem({ to, icon, label, close, highlight }) {
  return (
    <Link
      to={to}
      onClick={() => close(false)}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition
      ${highlight === "blue"
          ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          : "text-gray-800 hover:bg-gray-100"}`}
    >
      {icon}
      {label}
    </Link>
  );
}

export default Header;
