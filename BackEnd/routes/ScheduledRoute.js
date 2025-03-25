import express from "express";
import {
  getScheduled,
  getScheduledById,
  createScheduled,
  updateScheduled,
  deleteScheduled,
} from "../controllers/Scheduled.js";

const router = express.Router();

router.get("/scheduled", getScheduled);
router.get("/scheduled/:id", getScheduledById);
router.post("/scheduled", createScheduled);
router.patch("/scheduled/:id", updateScheduled);
router.delete("/scheduled/:id", deleteScheduled);

export default router;
