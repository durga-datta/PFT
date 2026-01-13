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
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, user } = useAuth();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-purple-500/20 text-purple-400"
        : "text-gray-300 hover:bg-purple-500/10"
    }`;

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE HAMBURGER */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 text-gray-300 hover:text-purple-400"
      >
        <FaBars size={20} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          min-h-screen bg-black border-r border-purple-600
          transition-all duration-300 flex flex-col
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          ${collapsed ? "md:w-20" : "md:w-64"}
          w-64
        `}
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

            {/* DESKTOP COLLAPSE */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-gray-300 hover:text-purple-400"
            >
              <FaBars />
            </button>

            {/* MOBILE CLOSE */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-gray-300 hover:text-purple-400"
            >
              <FaTimes />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="mt-8 space-y-2 text-sm">
            <NavLink to="/home" className={linkClasses} onClick={() => setMobileOpen(false)}>
              <FaTachometerAlt />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>

            <NavLink to="/profile" className={linkClasses} onClick={() => setMobileOpen(false)}>
              <FaUser />
              {!collapsed && <span>Profile</span>}
            </NavLink>

            <NavLink to="/expenses" className={linkClasses} onClick={() => setMobileOpen(false)}>
              <FaMoneyBillWave />
              {!collapsed && <span>Manage Expenses</span>}
            </NavLink>

            <NavLink to="/income" className={linkClasses} onClick={() => setMobileOpen(false)}>
              <FaWallet />
              {!collapsed && <span>Manage Income</span>}
            </NavLink>

            <NavLink to="/budgets" className={linkClasses} onClick={() => setMobileOpen(false)}>
              <FaChartPie />
              {!collapsed && <span>Set Budget</span>}
            </NavLink>

            <NavLink to="/transactions" className={linkClasses} onClick={() => setMobileOpen(false)}>
              <FaHistory />
              {!collapsed && <span>Transaction History</span>}
            </NavLink>

            {/* LOGOUT */}
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
    </>
  );
};

export default Sidebar;
