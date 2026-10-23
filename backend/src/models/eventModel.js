import mongoose from "mongoose";
import { departments, eventLocations } from "../utils/departments.js";

const eventSchema = mongoose.Schema(
  {
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      enum: eventLocations,
      required: true,
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 2,
      max: 1000,
    },
    departments: {
      type: [
        {
          type: String,
          enum: departments,
        },
      ],
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Events = mongoose.model("Events", eventSchema);
