import React, { useState } from "react";
import AddBudgetCard from "../components/AddBudgetCard";
import { useBudgets } from "../context/BudgetContext";

const Budgets = () => {
  const { budgets, addBudget, deleteBudget, setBudget } = useBudgets();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-screen overflow-y-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">
          Monthly Budgets
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-md"
        >
          + Set Budget
        </button>
      </div>

      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6">
        {budgets.length === 0 ? (
          <p className="text-gray-400">
            No budgets set yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="py-2 text-left">Month</th>
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-right">Budget</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {budgets.map((b) => (
                <tr key={b.id} className="border-b border-gray-800">
                  <td className="py-3">{b.month}</td>
                  <td>{b.category}</td>
                  <td className="text-right text-purple-400">
                    ₹ {b.amount}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => deleteBudget(b.id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

     
{showModal && (
  <AddBudgetCard
    onClose={() => setShowModal(false)}
    onAdd={setBudget}  
  />
)}
    </div>
  );
};

export default Budgets;
