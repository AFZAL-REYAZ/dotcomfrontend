// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-14 sm:h-16 relative flex items-center justify-between">
        {/* Left: menu + search */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Open menu" title="Menu">
            <Menu className="text-gray-900" size={22} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Search" title="Search">
            <Search className="text-gray-900" size={22} />
          </button>
        </div>

        {/* Center: brand */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-black font-extrabold text-xl sm:text-2xl pr-2 tracking-wide upercase select-none">
          DOTCOM
        </Link> 

        {/* Right: account + wishlist + bag */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* <Link to="/pay-with-reward" className="p-2 rounded-md hover:bg-gray-100 text-black" aria-label="Cart" title="Cart">
            Pay
          </Link> */}
          <Link to="/dashboard" className="p-2 rounded-md hover:bg-gray-100" aria-label="Cart" title="Cart">
            <User className="text-gray-900" size={22} />
          </Link>
          
          {/* <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Wishlist" title="Wishlist">
            <Heart className="text-gray-900" size={22} />
          </button> */}
          <Link to="/addtocart" className="p-2 rounded-md hover:bg-gray-100" aria-label="Cart" title="Cart">
            <ShoppingBag className="text-gray-900" size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
