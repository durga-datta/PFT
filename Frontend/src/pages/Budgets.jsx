import React, { useState } from "react";
import AddBudgetCard from "../components/AddBudgetCard";
import { useBudgets } from "../context/BudgetContext";

const Budgets = () => {
  const { budgets, deleteBudget, setBudget } = useBudgets();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-purple-400">
          Monthly Budgets
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-md"
        >
          + Set Budget
        </button>
      </div>

      {/* CONTENT */}
      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-4 md:p-6">
        {budgets.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No budgets set yet.
          </p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
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
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {budgets.map((b) => (
                <div
                  key={b.id}
                  className="border border-gray-800 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Month</span>
                    <span>{b.month}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Category</span>
                    <span>{b.category}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Budget</span>
                    <span className="text-purple-400 font-semibold">
                      ₹ {b.amount}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteBudget(b.id)}
                    className="w-full mt-2 text-sm text-red-400 border border-red-400/30 rounded-md py-1.5 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
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
