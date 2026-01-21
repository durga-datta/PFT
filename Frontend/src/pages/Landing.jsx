import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaPiggyBank,
  FaCoins,
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaUsers,
} from "react-icons/fa";

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }))
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-bounce"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-5 backdrop-blur-sm bg-black/10">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative">
            <FaWallet className="text-purple-500 text-2xl md:text-3xl animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Personal Finance Tracker
            </h1>
            <p className="text-xs text-gray-400 hidden md:block">PFT</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-300">
              <FaUsers className="text-purple-400" />
              <span>10K+ Users</span>
            </div>
            <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-300">
              <FaStar className="text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
          <Link to="/login">
            <button className="px-3 py-2 md:px-4 md:py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition duration-300 text-sm md:text-base font-medium">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-12 md:py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 md:mb-8">
            <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-purple-500/20 rounded-full text-purple-300 text-xs md:text-sm font-medium mb-4 md:mb-6 animate-fade-in">
              🚀 The Future of Personal Finance Management
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold leading-tight mb-6 md:mb-8 animate-slide-up">
            <span className="block">Take Control</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              of Your Money
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 md:mt-8 text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed animate-fade-in delay-300 px-2">
            Transform your financial life with our intelligent{" "}
            <span className="text-purple-400 font-semibold">Personal Finance Tracker</span>.
            Track expenses, manage budgets, and gain powerful insights — all in one stunning interface.
          </p>

          <div className="mt-8 md:mt-12 flex justify-center">
            <Link to="/signup">
              <button className="group relative px-6 py-3 md:px-10 md:py-5 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-bold text-base md:text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center space-x-2 md:space-x-3">
                  <span>Start Your Journey</span>
                  <FaRocket className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>

          <div className="mt-6 md:mt-8 flex flex-wrap justify-center items-center gap-3 md:gap-8 text-xs md:text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <FaCheckCircle className="text-green-400 text-sm" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCheckCircle className="text-green-400 text-sm" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCheckCircle className="text-green-400 text-sm" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 px-6 md:px-12 py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <FaChartLine className="text-4xl text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
              <div className="text-3xl font-bold text-white mb-2">85%</div>
              <div className="text-gray-300">Average Savings Increase</div>
            </div>
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <FaUsers className="text-4xl text-blue-400 mx-auto mb-4 group-hover:animate-bounce" />
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Happy Users Worldwide</div>
            </div>
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <FaStar className="text-4xl text-yellow-400 mx-auto mb-4 group-hover:animate-bounce" />
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-gray-300">User Satisfaction Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-up">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Smart Finance
            </span>
          </h3>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Everything you need to master your personal finances in one beautiful, intuitive platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: <FaCoins className="text-4xl text-purple-400 group-hover:animate-spin" />,
              title: "Smart Expense Tracking",
              desc: "AI-powered categorization and real-time expense monitoring with intelligent insights.",
              gradient: "from-purple-500 to-purple-700",
            },
            {
              icon: <FaPiggyBank className="text-4xl text-green-400 group-hover:animate-bounce" />,
              title: "Budget Management",
              desc: "Set custom budgets, receive alerts, and track progress with visual goal indicators.",
              gradient: "from-green-500 to-green-700",
            },
            {
              icon: <FaChartLine className="text-4xl text-blue-400 group-hover:animate-pulse" />,
              title: "Advanced Analytics",
              desc: "Beautiful charts, spending trends, and predictive insights to optimize your finances.",
              gradient: "from-blue-500 to-blue-700",
            },
            {
              icon: <FaWallet className="text-4xl text-pink-400 group-hover:animate-bounce" />,
              title: "Multi-Account Support",
              desc: "Connect all your accounts in one place with secure, encrypted data management.",
              gradient: "from-pink-500 to-pink-700",
            },
            {
              icon: <FaShieldAlt className="text-4xl text-yellow-400 group-hover:animate-pulse" />,
              title: "Bank-Level Security",
              desc: "Military-grade encryption, biometric authentication, and privacy-first design.",
              gradient: "from-yellow-500 to-yellow-700",
            },
            {
              icon: <FaMobileAlt className="text-4xl text-indigo-400 group-hover:animate-spin" />,
              title: "Cross-Platform Sync",
              desc: "Seamless experience across all devices with real-time synchronization.",
              gradient: "from-indigo-500 to-indigo-700",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors duration-300">
                  <div className="text-2xl md:text-3xl lg:text-4xl">
                    {React.cloneElement(feature.icon, { className: "text-purple-400 group-hover:animate-spin" })}
                  </div>
                </div>
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-16 md:py-24 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="text-center mb-12 md:mb-20">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-up">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h3>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Join thousands of users who have transformed their financial lives
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "Sign up in seconds with our secure, streamlined onboarding process.",
                icon: <FaRocket className="text-3xl" />,
              },
              {
                step: "02",
                title: "Connect & Import",
                desc: "Link your accounts or manually add transactions with smart categorization.",
                icon: <FaWallet className="text-3xl" />,
              },
              {
                step: "03",
                title: "Track & Optimize",
                desc: "Monitor your finances with AI insights and achieve your financial goals.",
                icon: <FaChartLine className="text-3xl" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center group relative">
                <div className="relative mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl md:text-2xl font-bold text-white shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                    {React.cloneElement(item.icon, { className: "text-xl md:text-2xl lg:text-3xl" })}
                  </div>
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 md:top-10 left-full w-full h-1 bg-gradient-to-r from-purple-500 to-transparent transform -translate-x-8 group-hover:from-pink-500 transition-colors duration-300"></div>
                  )}
                </div>
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300 px-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 text-center py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 animate-slide-up px-4">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Financial Future?
            </span>
          </h3>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Join the Personal Finance Tracker community today and take the first step towards financial freedom.
          </p>
          <Link to="/signup">
            <button className="group relative px-8 py-4 md:px-12 md:py-6 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-bold text-lg md:text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
              <span className="relative z-10 flex items-center justify-center space-x-2 md:space-x-3">
                <span>Start Free Today</span>
                <FaArrowRight className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          <p className="mt-4 md:mt-6 text-gray-400 text-xs md:text-sm px-4">
            No setup fees • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-gray-500 text-sm py-8 md:py-12 border-t border-gray-800/50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
            <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-0">
              <FaWallet className="text-purple-500 text-xl md:text-2xl" />
              <div>
                <h3 className="text-base md:text-lg font-bold text-white">Personal Finance Tracker</h3>
                <p className="text-xs text-gray-400">PFT - Your Financial Companion</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="hover:text-purple-400 transition-colors duration-300 text-xs md:text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300 text-xs md:text-sm">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300 text-xs md:text-sm">Support</a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300 text-xs md:text-sm">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800/50 pt-6 md:pt-8">
            <p className="text-gray-400 text-xs md:text-sm px-4">
              © {new Date().getFullYear()} Personal Finance Tracker. All rights reserved. Made with ❤️ for financial freedom.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
