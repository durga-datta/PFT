import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#a855f7",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ec4899",
];

const ExpenseCategoryChart = ({ expenses, month }) => {
  const categoryMap = {};

  expenses
    .filter((e) => e.date && e.date.startsWith(month))
    .forEach((e) => {
      categoryMap[e.category] =
        (categoryMap[e.category] || 0) + Number(e.amount);
    });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  if (data.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No expense data for this month.
      </p>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" aspect={1.3}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseCategoryChart;
