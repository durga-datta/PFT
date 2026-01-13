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
    <div className="px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-purple-400">
          Manage Expenses
        </h1>

        <button
          onClick={() => {
            setEditExpense(null);
            setShowModal(true);
          }}
          className="w-full md:w-auto px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 text-white"
        >
          + Add Expense
        </button>
      </div>

      {/* FILTER + TOTALS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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

        <div className="space-y-1 text-sm md:text-right">
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

      {/* CONTENT */}
      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <h2 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">
          Expense History
        </h2>

        {filteredExpenses.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No expense records found.
          </p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
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

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {filteredExpenses.map((exp) => (
                <div
                  key={exp.id}
                  className="border border-gray-800 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date</span>
                    <span>{exp.date || "-"}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Category</span>
                    <span>{exp.category}</span>
                  </div>

                  <div className="text-sm text-gray-400">
                    {exp.description || "No description"}
                  </div>

                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-red-400">
                      ₹ {exp.amount}
                    </span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setEditExpense(exp);
                        setShowModal(true);
                      }}
                      className="flex-1 text-sm text-purple-400 border border-purple-400/30 rounded-md py-1.5 hover:bg-purple-500/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="flex-1 text-sm text-red-400 border border-red-400/30 rounded-md py-1.5 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
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
