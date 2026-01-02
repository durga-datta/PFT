import db from "../config/db.js";
import bcrypt from "bcrypt";

export const getProfile = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user.id;

  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("PROFILE DB ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(result[0]);
    }
  );
};

export const updateName = (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ message: "Name required" });

  db.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, userId],
    (err) => {
      if (err)
        return res.status(500).json({ message: "DB error" });

      res.json({ message: "Name updated" });
    }
  );
};

export const resetPassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  db.query(
    "SELECT password FROM users WHERE id = ?",
    [userId],
    async (err, result) => {
      if (err)
        return res.status(500).json({ message: "DB error" });

      const isMatch = await bcrypt.compare(
        currentPassword,
        result[0].password
      );

      if (!isMatch)
        return res
          .status(401)
          .json({ message: "Current password wrong" });

      const hashed = await bcrypt.hash(newPassword, 10);

      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashed, userId],
        () => res.json({ message: "Password updated" })
      );
    }
  );
};
