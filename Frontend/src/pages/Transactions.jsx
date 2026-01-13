import React, { useMemo, useState } from "react";
import { useExpenses } from "../context/ExpensesContext";
import { useIncomes } from "../context/IncomeContext";

const Transactions = () => {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const transactions = useMemo(() => {
    const expenseTx = expenses.map((e) => ({
      ...e,
      txType: "expense",
      title: e.category,
      description: e.description || "",
    }));

    const incomeTx = incomes.map((i) => ({
      ...i,
      txType: "income",
      title: i.source,
      description: i.frequency,
    }));

    return [...expenseTx, ...incomeTx].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [expenses, incomes]);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType =
      typeFilter === "all" || tx.txType === typeFilter;

    const matchesSearch =
      tx.title?.toLowerCase().includes(search.toLowerCase()) ||
      tx.description?.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="px-4 md:px-6 py-6 md:py-8 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-purple-400">
        Transaction History
      </h1>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="text"
          placeholder="Search by category, source or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black border border-gray-600 rounded-md px-3 py-2 text-gray-200 w-full sm:w-72"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-black border border-gray-600 rounded-md px-3 py-2 text-gray-200 w-full sm:w-auto"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* CONTENT */}
      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No transactions found.
          </p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="border-b border-gray-700 text-gray-400">
                  <tr>
                    <th className="py-3 px-2 text-left">Date</th>
                    <th className="py-3 px-2 text-left">Type</th>
                    <th className="py-3 px-2 text-left">Title</th>
                    <th className="py-3 px-2 text-left">Description</th>
                    <th className="py-3 px-2 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((tx, index) => (
                    <tr
                      key={`${tx.txType}-${tx.id}`}
                      className={`border-b border-gray-800 ${
                        index % 2 === 0
                          ? "bg-black/40"
                          : "bg-black/20"
                      }`}
                    >
                      <td className="py-3 px-2 text-gray-300">
                        {tx.date}
                      </td>

                      <td
                        className={`py-3 px-2 capitalize ${
                          tx.txType === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.txType}
                      </td>

                      <td className="py-3 px-2 text-gray-200">
                        {tx.title}
                      </td>

                      <td
                        className="py-3 px-2 text-gray-400 max-w-xs truncate"
                        title={tx.description}
                      >
                        {tx.description || "-"}
                      </td>

                      <td
                        className={`py-3 px-2 text-right font-medium ${
                          tx.txType === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.txType === "income" ? "+" : "-"} ₹
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {filteredTransactions.map((tx) => (
                <div
                  key={`${tx.txType}-${tx.id}`}
                  className="border border-gray-800 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date</span>
                    <span>{tx.date}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Type</span>
                    <span
                      className={
                        tx.txType === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {tx.txType}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Title</span>
                    <span>{tx.title}</span>
                  </div>

                  <div className="text-sm text-gray-400">
                    {tx.description || "No description"}
                  </div>

                  <div className="flex justify-between text-sm font-semibold pt-1">
                    <span className="text-gray-400">Amount</span>
                    <span
                      className={
                        tx.txType === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {tx.txType === "income" ? "+" : "-"} ₹
                      {tx.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
