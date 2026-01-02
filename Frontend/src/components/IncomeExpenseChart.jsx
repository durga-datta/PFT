import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IncomeExpenseChart = ({ income, expense, month }) => {
  const data = [
    {
      name: month,
      Income: income,
      Expense: expense,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" fill="#22c55e" />
        <Bar dataKey="Expense" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
