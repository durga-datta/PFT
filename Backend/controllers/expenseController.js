import db from "../config/db.js";

export const getExpenses = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT 
      id,
      amount,
      category,
      description,
      DATE_FORMAT(date, '%Y-%m-%d') AS date
     FROM expenses
     WHERE user_id = ?
     ORDER BY date DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error("GET EXPENSES ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.json(rows);
    }
  );
};

export const addExpense = (req, res) => {
  const userId = req.user.id;
  const { amount, category, description, date } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.query(
    `INSERT INTO expenses 
     (user_id, amount, category, description, date)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, category, description || null, date],
    (err) => {
      if (err) {
        console.error("ADD EXPENSE ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      db.query(
        `SELECT 
          id,
          amount,
          category,
          description,
          DATE_FORMAT(date, '%Y-%m-%d') AS date
         FROM expenses
         WHERE user_id = ?
         ORDER BY date DESC`,
        [userId],
        (err2, rows) => {
          if (err2) {
            console.error("FETCH AFTER ADD ERROR:", err2);
            return res.status(500).json({ message: "DB error" });
          }

          res.status(201).json(rows);
        }
      );
    }
  );
};

export const updateExpense = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  db.query(
    `UPDATE expenses
     SET amount=?, category=?, description=?, date=?
     WHERE id=? AND user_id=?`,
    [amount, category, description || null, date, id, userId],
    (err) => {
      if (err) {
        console.error("UPDATE EXPENSE ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.json({ message: "Expense updated" });
    }
  );
};

export const deleteExpense = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    "DELETE FROM expenses WHERE id=? AND user_id=?",
    [id, userId],
    (err) => {
      if (err) {
        console.error("DELETE EXPENSE ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.json({ message: "Expense deleted" });
    }
  );
};
