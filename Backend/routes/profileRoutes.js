import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateName,
  resetPassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/name", authMiddleware, updateName);
router.put("/password", authMiddleware, resetPassword);

export default router;
