import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import FullPageLoader from "../components/FullPageLoader";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      await login(data.email, data.password);
      toast.success("Welcome back 👋", { id: toastId });
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid credentials",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {loading && <FullPageLoader />}

      {/* NAVBAR */}
      <nav className="h-16 flex items-center px-4 md:px-12">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-purple-500 hover:text-purple-400 transition"
        >
          PFT
        </Link>
      </nav>

      {/* CONTENT */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="relative w-full max-w-md md:max-w-4xl md:h-[450px] rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] overflow-hidden bg-black">

          {/* RIGHT PANEL (DESKTOP ONLY) */}
          <div className="hidden md:flex absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-700 to-purple-900 items-center justify-center">
            <div className="text-center px-10">
              <h1 className="text-3xl font-bold mb-3">
                WELCOME BACK!
              </h1>
              <p className="text-gray-200 text-sm">
                Login to access your dashboard.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 py-8"
          >
            {/* MOBILE HEADING */}
            <h2 className="text-xl font-bold mb-6 md:hidden">
              Welcome back 👋
            </h2>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                disabled={loading}
                type="email"
                className="w-full bg-transparent border-b border-gray-500 py-2 outline-none disabled:opacity-50"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                disabled={loading}
                type="password"
                className="w-full bg-transparent border-b border-gray-500 py-2 outline-none disabled:opacity-50"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-2 rounded-full
                bg-gradient-to-r from-purple-500 to-purple-700
                hover:opacity-90 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              Login
            </button>

            {/* SIGNUP LINK */}
            <p className="text-xs mt-6 text-gray-400 text-center md:text-left">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
