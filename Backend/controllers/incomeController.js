import db from "../config/db.js";

export const getIncome = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT 
      id,
      source,
      amount,
      frequency,
      DATE_FORMAT(date, '%Y-%m-%d') AS date
     FROM income
     WHERE user_id = ?
     ORDER BY date DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error("GET INCOME ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      res.json(rows);
    }
  );
};

export const addIncome = (req, res) => {
  const userId = req.user.id;
  const { source, amount, frequency, date } = req.body;

  if (!source || !amount || !date) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.query(
    `INSERT INTO income
     (user_id, source, amount, frequency, date)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, source, amount, frequency || "one-time", date],
    (err) => {
      if (err) {
        console.error("ADD INCOME ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      db.query(
        `SELECT 
          id,
          source,
          amount,
          frequency,
          DATE_FORMAT(date, '%Y-%m-%d') AS date
         FROM income
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

export const updateIncome = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { source, amount, frequency, date } = req.body;

  db.query(
    `UPDATE income
     SET source=?, amount=?, frequency=?, date=?
     WHERE id=? AND user_id=?`,
    [source, amount, frequency, date, id, userId],
    (err) => {
      if (err) {
        console.error("UPDATE INCOME ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      res.json({ message: "Income updated" });
    }
  );
};

export const deleteIncome = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    "DELETE FROM income WHERE id=? AND user_id=?",
    [id, userId],
    (err) => {
      if (err) {
        console.error("DELETE INCOME ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      res.json({ message: "Income deleted" });
    }
  );
};
