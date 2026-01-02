import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

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

      navigate("/verify-otp");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
 
      <div className="relative w-[900px] h-[520px] rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-700 to-purple-900 clip-diagonal flex items-center justify-center">
          <div className="text-center px-10">
            <h1 className="text-3xl font-bold text-white mb-3">
              CREATE ACCOUNT
            </h1>
            <p className="text-gray-200 text-sm">
              Start managing your finances smarter.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 w-1/2 h-full flex flex-col justify-center px-12 text-white"
        >

          {error && (
            <p className="text-red-400 text-sm mb-4">
              {error}
            </p>
          )}

          <div className="mb-4">
            <label className="text-sm mb-1 block">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full bg-transparent border-b border-gray-500 py-2 outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1 block">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="w-full bg-transparent border-b border-gray-500 py-2 outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1 block">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
              className="w-full bg-transparent border-b border-gray-500 py-2 outline-none"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full bg-transparent border-b border-gray-500 py-2 outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p className="text-xs mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
