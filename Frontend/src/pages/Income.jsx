import React, { useState } from "react";
import AddIncomeCard from "../components/AddIncomeCard";
import { useIncomes } from "../context/IncomeContext";

const Income = () => {
  const { incomes, addIncome, updateIncome, deleteIncome } = useIncomes();

  const [showModal, setShowModal] = useState(false);
  const [editIncome, setEditIncome] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const availableMonths = [
    ...new Set(
      incomes
        .filter((i) => i.date)
        .map((i) => i.date.slice(0, 7))
    ),
  ];

  const filteredIncomes = selectedMonth
    ? incomes.filter(
        (i) => i.date && i.date.startsWith(selectedMonth)
      )
    : incomes;

  const totalIncome = incomes.reduce(
    (sum, i) => sum + Number(i.amount),
    0
  );

  const monthlyIncome = filteredIncomes.reduce(
    (sum, i) => sum + Number(i.amount),
    0
  );

  return (
    <div className="h-screen overflow-y-auto px-6 py-8 space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-400">
          Manage Income
        </h1>

        <button
          onClick={() => {
            setEditIncome(null);
            setShowModal(true);
          }}
          className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 text-white"
        >
          + Add Income
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
            Total Income:&nbsp;
            <span className="text-green-400 font-semibold">
              ₹ {totalIncome}
            </span>
          </p>

          <p className="text-gray-300">
            {selectedMonth ? "Monthly Income:" : "Current Income:"}&nbsp;
            <span className="text-green-400 font-semibold">
              ₹ {monthlyIncome}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <h2 className="text-lg font-semibold text-white mb-6">
          Income History
        </h2>

        {filteredIncomes.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No income records found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b border-gray-700 text-gray-400">
                <tr>
                  <th className="py-3 px-2 text-left">Date</th>
                  <th className="py-3 px-2 text-left">Source</th>
                  <th className="py-3 px-2 text-left">Frequency</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                  <th className="py-3 px-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredIncomes.map((inc, index) => (
                  <tr
                    key={inc.id}
                    className={`border-b border-gray-800 ${
                      index % 2 === 0
                        ? "bg-black/40"
                        : "bg-black/20"
                    }`}
                  >
                    <td className="py-3 px-2 text-gray-300">
                      {inc.date || "-"}
                    </td>

                    <td className="py-3 px-2 text-gray-200">
                      {inc.source}
                    </td>

                    <td className="py-3 px-2 text-gray-400 capitalize">
                      {inc.frequency}
                    </td>

                    <td className="py-3 px-2 text-right text-green-400 font-medium">
                      ₹ {inc.amount}
                    </td>

                    <td className="py-3 px-2 text-center space-x-4">
                      <button
                        onClick={() => {
                          setEditIncome(inc);
                          setShowModal(true);
                        }}
                        className="text-purple-400 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteIncome(inc.id)}
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
        <AddIncomeCard
          onClose={() => setShowModal(false)}
          onAdd={addIncome}
          onUpdate={updateIncome}
          editData={editIncome}
        />
      )}
    </div>
  );
};

export default Income;
