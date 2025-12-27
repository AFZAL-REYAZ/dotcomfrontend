import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Coins,
  Gift,
  ShoppingCart,
  PlusCircle,
  Users,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-blue-100 via-sky-200 to-amber-100 flex flex-col items-center justify-center px-6 py-12 font-[Poppins] relative overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse delay-150"></div>

      <div className="z-10 w-full max-w-5xl text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
          📊 Admin Control Center
        </h2>
        <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
          Manage users, products, orders, rewards, and payments from one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Location */}
          <DashboardCard
            to="/location-dashboard"
            title="User Location Dashboard"
            desc="Track and monitor real-time user locations on the map."
            icon={<MapPin size={28} />}
            gradient="from-cyan-500 to-blue-600"
            ring="ring-cyan-200"
          />

          {/* Pay with Coins */}
          <DashboardCard
            to="/pay-with-reward"
            title="Pay with Coins"
            desc="Accept payments using reward coins and manage transactions."
            icon={<Coins size={28} />}
            gradient="from-emerald-500 to-teal-600"
            ring="ring-emerald-200"
          />

          {/* Rewards */}
          <DashboardCard
            to="/reward-dashboard"
            title="Reward Dashboard"
            desc="View, assign, and manage user reward balances."
            icon={<Gift size={28} />}
            gradient="from-purple-500 to-pink-500"
            ring="ring-purple-200"
          />

          {/* Orders */}
          <DashboardCard
            to="/order-dashboard"
            title="Order Dashboard"
            desc="Track orders, order status, and sales performance."
            icon={<ShoppingCart size={28} />}
            gradient="from-orange-500 to-red-500"
            ring="ring-orange-200"
          />

          {/* Add Product */}
          <DashboardCard
            to="/addproduct"
            title="Add Product"
            desc="Add new products and manage your inventory."
            icon={<PlusCircle size={28} />}
            gradient="from-indigo-500 to-violet-600"
            ring="ring-indigo-200"
          />

          {/* User Management */}
          <DashboardCard
            to="/user-management"
            title="User Management"
            desc="Manage user accounts, roles, and permissions."
            icon={<Users size={28} />}
            gradient="from-slate-600 to-gray-800"
            ring="ring-slate-300"
          />

        </div>
      </div>
    </div>
  );
};

/* REUSABLE CARD */
const DashboardCard = ({ to, title, desc, icon, gradient, ring }) => {
  return (
    <Link
      to={to}
      className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-slate-300"
    >
      <div
        className={`mx-auto w-fit p-4 rounded-full text-white bg-gradient-to-br ${gradient} 
        ring-4 ${ring} shadow-md 
        group-hover:scale-110 group-hover:rotate-3 transition`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-slate-800 mt-4 group-hover:text-black">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {desc}
      </p>
    </Link>
  );
};

export default Dashboard;
