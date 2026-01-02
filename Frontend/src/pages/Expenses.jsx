import React, { useState } from "react";
import AddExpenseCard from "../components/AddExpenseCard";
import { useExpenses } from "../context/ExpensesContext";

const Expenses = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useExpenses();

  const [showModal, setShowModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const availableMonths = [
    ...new Set(
      expenses
        .filter((e) => e.date)
        .map((e) => e.date.slice(0, 7))
    ),
  ];

  const filteredExpenses = selectedMonth
    ? expenses.filter(
        (e) => e.date && e.date.startsWith(selectedMonth)
      )
    : expenses;

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const monthlyExpense = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <div className="h-screen overflow-y-auto px-6 py-8 space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-400">
          Manage Expenses
        </h1>

        <button
          onClick={() => {
            setEditExpense(null);
            setShowModal(true);
          }}
          className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 text-white"
        >
          + Add Expense
        </button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-300">
            Filter by Month:
          </label>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-black border border-gray-600 rounded-md px-3 py-2 text-gray-200"
          >
            <option value="">All Months</option>
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {selectedMonth && (
            <button
              onClick={() => setSelectedMonth("")}
              className="text-sm text-purple-400 underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="text-right space-y-1">
          <p className="text-gray-300">
            Total Expense:&nbsp;
            <span className="text-red-400 font-semibold">
              ₹ {totalExpense}
            </span>
          </p>

          <p className="text-gray-300">
            {selectedMonth ? "Monthly Expense:" : "Current Expense:"}&nbsp;
            <span className="text-red-400 font-semibold">
              ₹ {monthlyExpense}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <h2 className="text-lg font-semibold text-white mb-6">
          Expense History
        </h2>

        {filteredExpenses.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No expense records found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b border-gray-700 text-gray-400">
                <tr>
                  <th className="py-3 px-2 text-left">Date</th>
                  <th className="py-3 px-2 text-left">Category</th>
                  <th className="py-3 px-2 text-left">Description</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                  <th className="py-3 px-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((exp, index) => (
                  <tr
                    key={exp.id}
                    className={`border-b border-gray-800 ${
                      index % 2 === 0
                        ? "bg-black/40"
                        : "bg-black/20"
                    }`}
                  >
                    <td className="py-3 px-2 text-gray-300">
                      {exp.date || "-"}
                    </td>

                    <td className="py-3 px-2 text-gray-200">
                      {exp.category}
                    </td>

                    <td
                      className="py-3 px-2 text-gray-400 max-w-xs truncate"
                      title={exp.description || "No description"}
                    >
                      {exp.description || "-"}
                    </td>

                    <td className="py-3 px-2 text-right font-medium text-red-400">
                      ₹ {exp.amount}
                    </td>

                    <td className="py-3 px-2 text-center space-x-4">
                      <button
                        onClick={() => {
                          setEditExpense(exp);
                          setShowModal(true);
                        }}
                        className="text-purple-400 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteExpense(exp.id)}
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
        )}
      </div>

      {showModal && (
        <AddExpenseCard
          onClose={() => setShowModal(false)}
          onAdd={addExpense}
          onUpdate={updateExpense}
          editData={editExpense}
        />
      )}
    </div>
  );
};

export default Expenses;
