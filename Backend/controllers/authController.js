import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";

/* =====================
   UTILITIES
===================== */
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000);

/* =====================
   SEND OTP
===================== */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    db.query(
      "SELECT id FROM users WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("SEND OTP DB ERROR:", err);
          return res.status(500).json({ message: "DB error" });
        }

        if (result.length) {
          return res
            .status(400)
            .json({ message: "Email already registered" });
        }

        const otp = generateOtp();
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        db.query(
          "INSERT INTO otp_verifications (email, otp, expires_at) VALUES (?,?,?)",
          [email, hashedOtp, expiresAt],
          async (err) => {
            if (err) {
              console.error("OTP DB ERROR:", err);
              return res
                .status(500)
                .json({ message: "OTP DB error" });
            }

            try {
              await sendEmail({
                to: email,
                subject: "Your OTP Verification Code",
                text: `Your OTP is ${otp}. It expires in 10 minutes.`,
              });

              return res.json({ message: "OTP sent to email" });
            } catch {
              return res.status(500).json({
                message:
                  "Failed to send OTP email. Please try again later.",
              });
            }
          }
        );
      }
    );
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* =====================
   VERIFY OTP
===================== */
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  db.query(
    "SELECT * FROM otp_verifications WHERE email=? ORDER BY id DESC LIMIT 1",
    [email],
    async (err, result) => {
      if (err)
        return res.status(500).json({ message: "DB error" });

      if (!result.length)
        return res.status(400).json({ message: "OTP not found" });

      const record = result[0];

      if (new Date() > record.expires_at)
        return res.status(400).json({ message: "OTP expired" });

      const isValid = await bcrypt.compare(otp, record.otp);
      if (!isValid)
        return res.status(400).json({ message: "Invalid OTP" });

      db.query(
        "DELETE FROM otp_verifications WHERE email=?",
        [email]
      );

      res.json({ success: true, message: "OTP verified" });
    }
  );
};

/* =====================
   REGISTER USER
===================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, is_verified) VALUES (?,?,?,1)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("REGISTER DB ERROR:", err);
          return res.status(500).json({ message: "DB error" });
        }

        const token = jwt.sign(
          { id: result.insertId },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(201).json({
          message: "User created",
          token,
        });
      }
    );
  } catch (err) {
    console.error("REGISTER SERVER ERROR:", err);
    res.status(500).json({ message: "Server crashed" });
  }
};

/* =====================
   LOGIN USER
===================== */
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT id, name, email, password, is_verified FROM users WHERE email=?",
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

      if (!user.is_verified) {
        return res.status(403).json({
          message: "Please verify your email first",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      delete user.password;

      res.json({ token, user });
    }
  );
};
