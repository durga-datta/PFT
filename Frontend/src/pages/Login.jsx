import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="h-16 flex items-center px-12">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-500 hover:text-purple-400 transition"
        >
          PFT
        </Link>
      </nav>

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="relative w-[900px] h-[450px] rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] overflow-hidden">

          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-700 to-purple-900 clip-diagonal flex items-center justify-center">
            <div className="text-center px-10">
              <h1 className="text-3xl font-bold mb-3">
                WELCOME BACK!
              </h1>
              <p className="text-gray-200 text-sm">
                Login to access your dashboard.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 w-1/2 h-full flex flex-col justify-center px-12"
          >
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Email
              </label>
              <div className="flex items-center border-b border-gray-500">
                <input
                  type="email"
                  className="w-full bg-transparent py-2 outline-none text-sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <span className="text-gray-400">✉️</span>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="flex items-center border-b border-gray-500">
                <input
                  type="password"
                  className="w-full bg-transparent py-2 outline-none text-sm"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                />
                <span className="text-gray-400">🔒</span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 transition"
            >
              Login
            </button>
            <p className="text-xs mt-6 text-gray-400">
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
