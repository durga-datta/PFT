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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md bg-black border border-purple-600 rounded-xl p-5 md:p-6 shadow-[0_0_40px_rgba(168,85,247,0.6)] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-semibold text-center mb-6">
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
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-500/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700"
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
