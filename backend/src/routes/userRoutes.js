import express from "express";
import {
  createUser,
  confirmEmail,
  loginUser,
  getProfile,
} from "../controllers/userControllers.js";
import { verifyTokenAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.get("/verify-email", confirmEmail);
router.get("/:id/profile", verifyTokenAuth, getProfile);
export default router;
