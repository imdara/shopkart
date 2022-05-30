import { Router } from "express";
import {
  getUserName,
  logUserIn,
  signUserUp,
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .get("/", authMiddleware, getUserName)
  .post("/login", logUserIn)
  .post("/signup", signUserUp);

export default router;
