import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaMoneyBillWave,
  FaWallet,
  FaHistory,
  FaChartPie,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth(); // ✅ hook INSIDE component

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-purple-500/20 text-purple-400"
        : "text-gray-300 hover:bg-purple-500/10"
    }`;

  return (
    <aside
      className={`min-h-screen bg-black border-r border-purple-600 transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* TOP */}
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div>
              <NavLink to="/home">
                <h1 className="text-xl font-bold text-purple-500">PFT</h1>
              </NavLink>

              {user && (
                <p className="text-xs text-gray-400 mt-1">
                  Hi, {user.name}
                </p>
              )}
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-purple-400"
          >
            <FaBars />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="mt-8 space-y-2 text-sm">
          <NavLink to="/home" className={linkClasses}>
            <FaTachometerAlt />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/profile" className={linkClasses}>
            <FaUser />
            {!collapsed && <span>Profile</span>}
          </NavLink>

          <NavLink to="/expenses" className={linkClasses}>
            <FaMoneyBillWave />
            {!collapsed && <span>Manage Expenses</span>}
          </NavLink>

          <NavLink to="/income" className={linkClasses}>
            <FaWallet />
            {!collapsed && <span>Manage Income</span>}
          </NavLink>

          <NavLink to="/budgets" className={linkClasses}>
            <FaChartPie />
            {!collapsed && <span>Set Budget</span>}
          </NavLink>

          <NavLink to="/transactions" className={linkClasses}>
            <FaHistory />
            {!collapsed && <span>Transaction History</span>}
          </NavLink>

          {/* LOGOUT — BELOW TRANSACTIONS */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition w-full"
          >
            <FaSignOutAlt />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
