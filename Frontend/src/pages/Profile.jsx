import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";

const Profile = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/profile");
      setValue("name", res.data.name);
      setValue("email", res.data.email);
      setLoading(false);
    };
    fetchProfile();
  }, [setValue]);

  const handleNameUpdate = async (data) => {
    if (!isEditingName) {
      setIsEditingName(true);
      return;
    }

    await api.put("/profile/name", { name: data.name });
    setIsEditingName(false);
    alert("Name updated");
  };

  const handlePasswordReset = async (data) => {
    if (!data.newPassword) return;

    await api.put("/profile/password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    alert("Password updated");
  };

  if (loading) return null;

  return (
    <div className="px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-purple-500">
          Profile
        </h1>

        {/* USER INFO */}
        <form
          onSubmit={handleSubmit(handleNameUpdate)}
          className="rounded-xl border border-purple-600 p-4 md:p-6 bg-black"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
            User Information
          </h2>

          {/* NAME */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Name</label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                {...register("name", { required: true })}
                disabled={!isEditingName}
                className={`flex-1 border-b py-2 outline-none ${
                  isEditingName
                    ? "bg-transparent border-gray-500"
                    : "bg-gray-800/40 border-gray-600"
                }`}
              />

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 rounded-full bg-purple-600"
              >
                {isEditingName ? "Done" : "Update"}
              </button>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              {...register("email")}
              readOnly
              className="w-full bg-gray-800/40 border-b py-2"
            />
          </div>
        </form>

        {/* PASSWORD RESET */}
        <form
          onSubmit={handleSubmit(handlePasswordReset)}
          className="rounded-xl border border-purple-600 p-4 md:p-6 bg-black"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
            Reset Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            {...register("currentPassword")}
            className="w-full mb-4 bg-transparent border-b py-2"
          />

          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
            className="w-full mb-4 bg-transparent border-b py-2"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (v) =>
                !newPassword || v === newPassword,
            })}
            className="w-full mb-6 bg-transparent border-b py-2"
          />

          <button className="w-full sm:w-auto px-6 py-2 rounded-full bg-purple-600">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
