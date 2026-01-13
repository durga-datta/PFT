import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const categories = [
  "Groceries",
  "Dining Out",
  "Transportation",
  "Clothing",
  "Utilities",
];

const AddExpenseCard = ({ onClose, onAdd, onUpdate, editData }) => {
  const { register, handleSubmit, reset } = useForm();

  /* ---------- PREFILL ON EDIT ---------- */
  useEffect(() => {
    if (editData) {
      reset({
        amount: editData.amount,
        category: editData.category,
        date: editData.date,
        description: editData.description || "",
      });
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      date: data.date + "T00:00:00", // timezone fix
    };

    if (editData) {
      onUpdate({ ...payload, id: editData.id });
    } else {
      onAdd(payload);
    }

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black border border-purple-600 rounded-xl p-5 md:p-6 shadow-[0_0_40px_rgba(168,85,247,0.6)] max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-6 text-center">
          {editData ? "Edit Expense" : "Add Expense"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Amount */}
          <input
            {...register("amount", { required: true })}
            type="number"
            placeholder="Amount"
            className="w-full bg-transparent border-b border-gray-500 outline-none py-2"
          />

          {/* Category */}
          <select
            {...register("category", { required: true })}
            className="w-full bg-black border-b border-gray-500 outline-none py-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Date */}
          <input
            {...register("date", { required: true })}
            type="date"
            className="w-full bg-transparent border-b border-gray-500 outline-none py-2"
          />

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description (optional)"
            className="w-full bg-transparent border border-gray-500 rounded-md p-2"
          />

          {/* Actions */}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseCard;
