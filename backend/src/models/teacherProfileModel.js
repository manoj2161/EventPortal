import mongoose from "mongoose";
import { departments, course } from "../utils/departments.js";
const teacherProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    department: {
      type: String,
      enum: departments,
      required: true,
    },
  },
  { timestamps: true },
);

export const Teacher = mongoose.model("teacherDetails", teacherProfileSchema);
