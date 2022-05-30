import { Router } from "express";
import {
  placeAnOrder,
  verifyPayment,
} from "../controllers/paymentsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .post("/", authMiddleware, placeAnOrder)
  .post("/verify", authMiddleware, verifyPayment);

export default router;
