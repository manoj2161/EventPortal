import mongoose from "mongoose";
import "dotenv/config";
export const connectdb = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "EventsPortal",
  });
  console.log("database connected successfully...");
};
