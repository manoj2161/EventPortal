import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectdb } from "./src/config/db.js";
import dns from "node:dns";
import userRouter from "./src/routes/userRoutes.js";
import cors from "cors";

dns.setServers(["8.8.4.4", "8.8.8.8"]);
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
const portName = process.env.PORT;
const appName = process.env.APP_NAME;
connectdb();
app.use("/api/auth/user", userRouter);
app.listen(portName, () => {
  console.log(`${appName} is running on port ${port}`);
});
