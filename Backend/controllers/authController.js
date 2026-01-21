import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* =====================
   REGISTER
===================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    db.query(
      "SELECT id FROM users WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("REGISTER CHECK DB ERROR:", err);
          return res.status(500).json({ message: "DB error" });
        }

        if (result.length) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (name, email, password) VALUES (?,?,?)",
          [name, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("REGISTER DB ERROR:", err);
              return res.status(500).json({ message: "DB error" });
            }

            const token = jwt.sign(
              { id: result.insertId },
              process.env.JWT_SECRET,
              { expiresIn: "1y" }
            );

            // Fetch the created user
            db.query(
              "SELECT id, name, email FROM users WHERE id=?",
              [result.insertId],
              (err, userResult) => {
                if (err) {
                  console.error("REGISTER FETCH USER ERROR:", err);
                  return res.status(500).json({ message: "DB error" });
                }

                const user = userResult[0];

                res.status(201).json({
                  message: "User created",
                  token,
                  user,
                });
              }
            );
          }
        );
      }
    );
  } catch (err) {
    console.error("REGISTER SERVER ERROR:", err);
    res.status(500).json({ message: "Server crashed" });
  }
};

/* =====================
   LOGIN
===================== */
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT id, name, email, password FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        console.error("LOGIN DB ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }

      if (!result.length) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );

      delete user.password;

      res.json({ token, user });
    }
  );
};
