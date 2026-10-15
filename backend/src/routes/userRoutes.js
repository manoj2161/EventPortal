import express from "express";
import {
  createUser,
  confirmEmail,
  loginUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.get("/verify-email", confirmEmail);
export default router;
