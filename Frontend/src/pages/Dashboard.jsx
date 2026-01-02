import React from "react";
import { useExpenses } from "../context/ExpensesContext";
import { useIncomes } from "../context/IncomeContext";
import { useBudgets } from "../context/BudgetContext";
import { useAuth } from "../context/AuthContext";

import ExpenseCategoryChart from "../components/ExpenseCategoryChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

const Dashboard = () => {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();
  const { budgets } = useBudgets();
  const { user } = useAuth();

  const selectedMonth = new Date().toISOString().slice(0, 7);

  const totalIncome = incomes.reduce(
    (sum, i) => sum + Number(i.amount),
    0
  );

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const monthlyIncome = incomes
    .filter((i) => i.date && i.date.startsWith(selectedMonth))
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const monthlyExpense = expenses
    .filter((e) => e.date && e.date.startsWith(selectedMonth))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalIncome - totalExpense;

  const budgetProgress = budgets
    .filter((b) => b.month === selectedMonth)
    .map((b) => {
      const spent = expenses
        .filter(
          (e) =>
            e.category === b.category &&
            e.date &&
            e.date.startsWith(selectedMonth)
        )
        .reduce((sum, e) => sum + Number(e.amount), 0);

      const percent = Math.min(
        (spent / Number(b.amount)) * 100,
        100
      );

      return {
        ...b,
        spent,
        percent,
      };
    });

  return (
    <div className="p-6 space-y-10">

      <div>
        <h1 className="text-2xl font-bold text-purple-400">
          {user ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
        </h1>
        <p className="text-gray-400 mt-1">
          Here’s a snapshot of your finances
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Income" value={totalIncome} color="green" />
        <StatCard title="Total Expense" value={totalExpense} color="red" />
        <StatCard title="Balance" value={balance} color="purple" />
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="This Month Income"
          value={monthlyIncome}
          color="green"
        />
        <StatCard
          title="This Month Expense"
          value={monthlyExpense}
          color="red"
        />
      </div>

  
      <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Budget Progress ({selectedMonth})
        </h2>

        {budgetProgress.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No budgets set for this month.
          </p>
        ) : (
          <div className="space-y-4">
            {budgetProgress.map((b) => (
              <div key={b.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{b.category}</span>
                  <span className="text-gray-400">
                    ₹{b.spent} / ₹{b.amount}
                  </span>
                </div>

                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      b.percent >= 100
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${b.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Expense by Category
          </h2>

          <ExpenseCategoryChart
            expenses={expenses}
            month={selectedMonth}
          />
        </div>

        <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Income vs Expense
          </h2>

          <IncomeExpenseChart
            income={monthlyIncome}
            expense={monthlyExpense}
            month={selectedMonth}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colorMap = {
    green: "text-green-400",
    red: "text-red-400",
    purple: "text-purple-400",
  };

  return (
    <div className="bg-[#0f0f0f] border border-purple-600 rounded-xl p-6 shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>
        ₹ {value}
      </p>
    </div>
  );
};

export default Dashboard;
