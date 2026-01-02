import React from "react";
import { useForm } from "react-hook-form";

const AddIncomeCard = ({ onClose, onAdd, onUpdate, editData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: editData || {},
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      date: data.date + "T00:00:00", // ✅ timezone safe
    };

    if (editData) {
      await onUpdate({ ...payload, id: editData.id });
    } else {
      await onAdd(payload);
    }

    reset();
    onClose(); // ✅ close ONLY after DB + state sync
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[420px] rounded-xl border border-purple-600 bg-black p-6 shadow-[0_0_40px_rgba(168,85,247,0.6)]">
        <h2 className="text-xl font-semibold text-center mb-6">
          {editData ? "Edit Income" : "Add Income"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Source */}
          <select
            {...register("source", { required: true })}
            className="w-full bg-black border-b border-gray-500 outline-none py-2 text-gray-200"
          >
            <option value="">Select Source</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="others">Others</option>
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            {...register("amount", { required: true })}
            className="w-full bg-transparent border-b border-gray-500 outline-none py-2 text-gray-200"
          />

          {/* Frequency */}
          <select
            {...register("frequency")}
            className="w-full bg-black border-b border-gray-500 outline-none py-2 text-gray-200"
          >
            <option value="one-time">One Time</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>

          {/* Date */}
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full bg-transparent border-b border-gray-500 outline-none py-2 text-gray-200"
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
              {editData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeCard;
