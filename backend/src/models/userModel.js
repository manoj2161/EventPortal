import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Organiser"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationTokenExpiredIn: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000),
  },
  authToken: {
    type: String,
  },
  refreshTokenHash: {
    type: String,
  },
});
export const User = mongoose.model("users", userSchema);
