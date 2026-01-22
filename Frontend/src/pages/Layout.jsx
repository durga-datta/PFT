import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            min-h-screen
            overflow-y-auto
            pt-16 md:pt-0
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
