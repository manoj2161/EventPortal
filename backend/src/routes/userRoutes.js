import express from "express";
import {
  createUser,
  confirmEmail,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
  createEvent,
} from "../controllers/userControllers.js";
import { verifyTokenAuth } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.get("/verify-email", confirmEmail);
router.get("/profile", verifyTokenAuth, getProfile);
// router.get("/profile/dashboard", verifyTokenAuth, getEvents);
router.put("/profile/update-profile", verifyTokenAuth, updateProfile);
router.get("/admin/users", verifyTokenAuth, verifyAdmin, getAllUsers);
router.delete(
  "/admin/users/:id/delete",
  verifyTokenAuth,
  verifyAdmin,
  deleteUser,
);

//creating events
router.put("/profile/dashboard/create-event", verifyTokenAuth, createEvent);
export default router;
