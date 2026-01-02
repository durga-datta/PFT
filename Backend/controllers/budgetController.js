import db from "../config/db.js";

export const getBudgets = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM budgets WHERE user_id = ? ORDER BY month DESC",
    [userId],
    (err, rows) => {
      if (err)
        return res.status(500).json({ message: "DB error" });

      res.json(rows);
    }
  );
};

export const setBudget = (req, res) => {
  const userId = req.user.id;
  const { category, amount, month } = req.body;

  if (!category || !amount || !month) {
    return res
      .status(400)
      .json({ message: "Missing fields" });
  }

  db.query(
    `INSERT INTO budgets (user_id, category, amount, month)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE amount = ?`,
    [userId, category, amount, month, amount],
    (err) => {
      if (err)
        return res.status(500).json({ message: "DB error" });

      res.json({ message: "Budget saved" });
    }
  );
};

export const deleteBudget = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    "DELETE FROM budgets WHERE id = ? AND user_id = ?",
    [id, userId],
    (err) => {
      if (err)
        return res.status(500).json({ message: "DB error" });

      res.json({ message: "Budget deleted" });
    }
  );
};
