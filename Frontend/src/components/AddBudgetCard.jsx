import React from "react";
import { useForm } from "react-hook-form";

const categories = [
  "Groceries",
  "Dining Out",
  "Transportation",
  "Clothing",
  "Utilities",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1];
};

const AddBudgetCard = ({ onClose, onAdd, editData }) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: editData || {
      month: "",
      year: "",
      category: "",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    const formattedMonth = `${data.year}-${String(
      months.indexOf(data.month) + 1
    ).padStart(2, "0")}`;

    onAdd({
      category: data.category,
      amount: Number(data.amount),
      month: formattedMonth, // YYYY-MM (DB format)
    });

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-[420px] bg-black border border-purple-600 rounded-xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.6)]">
        <h2 className="text-xl font-semibold text-center mb-6">
          {editData ? "Edit Budget" : "Set Monthly Budget"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Month + Year */}
          <div className="flex gap-4">
            <select
              {...register("month", { required: true })}
              className="w-1/2 bg-black border-b border-gray-500 outline-none py-2"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              {...register("year", { required: true })}
              className="w-1/2 bg-black border-b border-gray-500 outline-none py-2"
            >
              <option value="">Year</option>
              {getYears().map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <select
            {...register("category", { required: true })}
            className="w-full bg-black border-b border-gray-500 outline-none py-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Budget Amount"
            {...register("amount", { required: true })}
            className="w-full bg-transparent border-b border-gray-500 outline-none py-2"
          />

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetCard;
