import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="flex items-center justify-between px-12 py-6">
        <h1 className="text-2xl font-bold text-purple-500">PFT</h1>
        <Link to={'/login'}>
        
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 transition">
          Login
        </button>
        </Link>
      </nav>

      <section className="relative flex items-center justify-center px-12 py-20">
        <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-3xl rounded-full -z-10"></div>

        <div className="grid grid-cols-2 gap-10 w-full max-w-6xl items-center">
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Manage Your <br />
              <span className="text-purple-500">Digital World</span>
            </h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              A modern platform to track, manage, and grow your digital presence
              with speed and security.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] bg-black p-8">
              <h3 className="text-xl font-semibold mb-4">
                Why Choose Us?
              </h3>

              <ul className="space-y-4 text-sm text-gray-300">
                <li>⚡ Fast & secure authentication</li>
                <li>🎨 Modern neon UI experience</li>
                <li>🔐 Data protection guaranteed</li>
                <li>📊 Smart dashboard insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-12 py-20">
        <h3 className="text-3xl font-bold text-center mb-14">
          Powerful <span className="text-purple-500">Features</span>
        </h3>

        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Secure Authentication",
            "Real-Time Data",
            "Cloud Ready",
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-purple-600 p-6 bg-black shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition"
            >
              <h4 className="text-lg font-semibold mb-3">{item}</h4>
              <p className="text-sm text-gray-400">
                Designed to give you the best performance and scalability with
                modern tech.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-20">
        <h3 className="text-4xl font-bold mb-6">
          Ready to get <span className="text-purple-500">started?</span>
        </h3>
        <Link to={'/signup'}>
        
        <button className="px-10 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90">
          Create Account
        </button>
        </Link>
      </section>

      <footer className="text-center text-gray-500 text-xs py-6">
        © 2025 YourApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
