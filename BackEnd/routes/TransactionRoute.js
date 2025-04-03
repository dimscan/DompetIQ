import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/Transactions.js";
import { verifyUser } from "../middleware/AuthUsers.js";

const router = express.Router();

router.get("/transactions", verifyUser, getTransactions);
router.get("/transactions/:id", verifyUser, getTransactionById);
router.post("/transactions", verifyUser, createTransaction);
router.patch("/transactions/:id", verifyUser, updateTransaction);
router.delete("/transactions/:id", verifyUser, deleteTransaction);

export default router;
