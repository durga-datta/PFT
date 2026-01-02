import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupData = JSON.parse(localStorage.getItem("signupData"));

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/verify-otp", {
        email: signupData.email,
        otp,
      });

      const res = await api.post("/auth/register", signupData);

      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("signupData");

      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative w-[420px] h-[380px] rounded-xl border border-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] overflow-hidden">

        <div className="h-32 bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">
            Verify OTP
          </h1>
        </div>

        <form onSubmit={handleVerify} className="px-10 pt-8 text-white">
          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <div className="mb-6">
            <label className="text-sm mb-2 block">
              Enter OTP sent to
              <span className="text-purple-400 ml-1">
                {signupData?.email}
              </span>
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              maxLength={6}
              className="w-full bg-transparent border-b border-gray-500 py-3 text-center tracking-[0.5em] text-lg outline-none"
              placeholder="••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
