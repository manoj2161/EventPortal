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
  getEvents,
  eventStatus,
  logoutUser,
} from "../controllers/userControllers.js";
import { verifyTokenAuth } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router();
router.get("/dashboard",getEvents);
// signup user
router.post("/signup", createUser);
// signin user
router.post("/signin", loginUser);
// verfiy email
router.get("/verify-email", confirmEmail);
// getting profile
router.get("/profile", verifyTokenAuth, getProfile);
// getting all events
router.get("/profile/dashboard", verifyTokenAuth, getEvents);
// update profile
router.put("/profile/update-profile", verifyTokenAuth, updateProfile);
// get all users
router.get("/admin/users", verifyTokenAuth, verifyAdmin, getAllUsers);
// delete user
router.delete(
  "/admin/users/:id/delete",
  verifyTokenAuth,
  verifyAdmin,
  deleteUser,
);
//creating events
router.put("/profile/dashboard/create-event", verifyTokenAuth, createEvent);
// approving or rejecting the event
router.patch("/profile/dashboard/:id/status", verifyTokenAuth, eventStatus);
// logout route
router.patch("/profile/dashboard/signout", verifyTokenAuth, logoutUser);
export default router;
