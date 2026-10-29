import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectdb } from "./src/config/db.js";
import dns from "node:dns";
import userRouter from "./src/routes/userRoutes.js";
dns.setServers(["8.8.4.4", "8.8.8.8"]);
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT;
const appName = process.env.APP_NAME;
connectdb();
app.use("/api/auth/user", userRouter);
app.listen(port, () => {
  console.log(`${appName} is running on port ${port}`);
});
