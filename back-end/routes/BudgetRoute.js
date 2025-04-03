import express from "express";
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/Budgets.js";
import { verifyUser } from "../middleware/AuthUsers.js";

const router = express.Router();

router.get("/budgets", verifyUser, getBudgets);
router.get("/budgets/:id", verifyUser, getBudgetById);
router.post("/budgets", verifyUser, createBudget);
router.patch("/budgets/:id", verifyUser, updateBudget);
router.delete("/budgets/:id", verifyUser, deleteBudget);

export default router;
