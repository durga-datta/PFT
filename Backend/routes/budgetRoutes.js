import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getBudgets,
  setBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", authMiddleware, getBudgets);
router.post("/", authMiddleware, setBudget);
router.delete("/:id", authMiddleware, deleteBudget);

export default router;
