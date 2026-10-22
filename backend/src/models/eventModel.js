import mongoose from "mongoose";
import { departments } from "../utils/departments.js";

const eventSchema = mongoose.Schema(
  {
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    eventDate: {
      type: String,
      required: true,
      trim: true,
    },
    eventTime: {
      type: String,
      required: true,
      trim: true,
    },

    eventLocation: {
      type: String,
      required: true,
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: true,
      trim: true,
      min: 2,
      max: 1000,
    },
    department: {
      type: String,
      enum: departments,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Events = mongoose.model("Events", eventSchema);
