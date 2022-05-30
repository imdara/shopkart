import { Router } from "express";
import {
  getAllProducts,
  addProduct,
} from "../controllers/productsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .get("/", getAllProducts)
  .post("/", authMiddleware, addProduct);

export default router;
