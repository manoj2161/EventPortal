import mongoose from "mongoose";
import { departments, course } from "../utils/departments.js";
const studentProfileSchema = mongoose.Schema(
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
    rollNo: {
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
    courses: {
      type: String,
      enum: course,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
  },
  { timestamps: true },
);

export const Student =  mongoose.model(
  "studentDetails",
  studentProfileSchema,
);
