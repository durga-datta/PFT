import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getIncome,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router.get("/", authMiddleware, getIncome);
router.post("/", authMiddleware, addIncome);
router.put("/:id", authMiddleware, updateIncome);
router.delete("/:id", authMiddleware, deleteIncome);

export default router;
