import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

/* =========================
   ✅ CORS CONFIG (IMPORTANT)
   ========================= */
const allowedOrigins = [
  "http://localhost:5173",                 // local frontend
  "https://pft-ytux.onrender.com",     // production frontend (CHANGE if needed)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error("CORS policy does not allow this origin"),
          false
        );
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ========================= */

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("🚀 PFT API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
