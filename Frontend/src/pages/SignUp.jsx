import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import FullPageLoader from "../components/FullPageLoader";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Sending OTP...");

    try {
      await api.post("/auth/send-otp", {
        email: data.email,
      });

      localStorage.setItem(
        "signupData",
        JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );

      toast.success("OTP sent successfully 📩", { id: toastId });
      navigate("/verify-otp");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send OTP",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {loading && <FullPageLoader />}

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="relative w-full max-w-md md:max-w-4xl md:h-[520px] rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] overflow-hidden bg-black">

          {/* RIGHT PANEL (DESKTOP ONLY) */}
          <div className="hidden md:flex absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-700 to-purple-900 items-center justify-center">
            <div className="text-center px-10">
              <h1 className="text-3xl font-bold mb-3">
                CREATE ACCOUNT
              </h1>
              <p className="text-gray-200 text-sm">
                Start managing your finances smarter.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 py-8"
          >
            <h2 className="text-xl font-bold mb-6 md:hidden">
              Create Account
            </h2>

            {/* NAME */}
            <div className="mb-4">
              <label className="text-sm mb-1 block">Name</label>
              <input
                disabled={loading}
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full bg-transparent border-b border-gray-500 py-2 outline-none disabled:opacity-50"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-sm mb-1 block">Email</label>
              <input
                disabled={loading}
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className="w-full bg-transparent border-b border-gray-500 py-2 outline-none disabled:opacity-50"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="text-sm mb-1 block">Password</label>
              <input
                disabled={loading}
                type="password"
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                })}
                className="w-full bg-transparent border-b border-gray-500 py-2 outline-none disabled:opacity-50"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-6">
              <label className="text-sm mb-1 block">
                Confirm Password
              </label>
              <input
                disabled={loading}
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                })}
                className="w-full bg-transparent border-b border-gray-500 py-2 outline-none disabled:opacity-50"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            {/* LOGIN LINK */}
            <p className="text-xs mt-6 text-gray-400 text-center md:text-left">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
