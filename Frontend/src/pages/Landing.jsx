import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
        <h1 className="text-xl md:text-2xl font-bold text-purple-500">
          PFT
        </h1>

        <Link to="/login">
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 transition text-sm md:text-base">
            Login
          </button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative flex items-center justify-center px-4 md:px-12 py-16 md:py-20">
        <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600 opacity-20 blur-3xl rounded-full -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl items-center">
          {/* LEFT */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Manage Your <br />
              <span className="text-purple-500">Digital World</span>
            </h2>

            <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
              A modern platform to track, manage, and grow your digital presence
              with speed and security.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] bg-black p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Why Choose Us?
              </h3>

              <ul className="space-y-3 text-sm text-gray-300">
                <li>⚡ Fast & secure authentication</li>
                <li>🎨 Modern neon UI experience</li>
                <li>🔐 Data protection guaranteed</li>
                <li>📊 Smart dashboard insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 md:px-12 py-16 md:py-20">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14">
          Powerful <span className="text-purple-500">Features</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            "Secure Authentication",
            "Real-Time Data",
            "Cloud Ready",
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-purple-600 p-6 bg-black shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition"
            >
              <h4 className="text-lg font-semibold mb-3">
                {item}
              </h4>
              <p className="text-sm text-gray-400">
                Designed to give you the best performance and scalability with
                modern tech.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 md:py-20 px-4">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to get{" "}
          <span className="text-purple-500">started?</span>
        </h3>

        <Link to="/signup">
          <button className="px-8 md:px-10 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 text-sm md:text-base">
            Create Account
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 text-xs py-6">
        © 2025 PFT. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
