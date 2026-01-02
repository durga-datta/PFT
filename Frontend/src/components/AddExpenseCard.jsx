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
        date: editData.date, // already formatted from DB
        description: editData.description || "",
      });
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      // Fix timezone issue
      date: data.date + "T00:00:00",
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-[420px] rounded-xl border border-purple-600 bg-black p-6 shadow-[0_0_40px_rgba(168,85,247,0.6)]">
        <h3 className="text-xl font-semibold mb-6 text-center">
          {editData ? "Edit Expense" : "Add Expense"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Amount */}
          <input
            {...register("amount", { required: true })}
            type="number"
            placeholder="Amount"
            className="w-full mb-4 bg-transparent border-b border-gray-500 outline-none py-2"
          />

          {/* Category */}
          <select
            {...register("category", { required: true })}
            className="w-full mb-4 bg-black border-b border-gray-500 outline-none py-2"
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
            className="w-full mb-4 bg-transparent border-b border-gray-500 outline-none py-2"
          />

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description (optional)"
            className="w-full mb-6 bg-transparent border border-gray-500 rounded-md p-2"
          />

          {/* Actions */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-500 hover:bg-gray-500/10"
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

export default AddExpenseCard;
