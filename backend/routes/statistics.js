import { Router } from "express";
import { getStatistics } from "../controllers/statisticsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router().get("/", authMiddleware, getStatistics);

export default router;
