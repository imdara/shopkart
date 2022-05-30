import { Router } from "express";
import {
  getAllOrders,
  getCurrentUserOrders,
} from "../controllers/ordersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .get("/all", authMiddleware, getAllOrders)
  .get("/", authMiddleware, getCurrentUserOrders);

export default router;
