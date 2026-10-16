import { createHash } from "crypto";
import { User } from "../models/userModel.js";
export const verifyTokenAuth = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      isSuccess: false,
      message: "Invalid or expired token",
      statusCode: 401,
    });
  }
  const authorized = createHash("sha256").update(authToken).digest("hex");
  const user = await User.findOne({ authToken: authorized });
  if (!user) {
    return res.status(401).json({
      isSuccess: false,
      message: "Invalid or expired token",
      statusCode: 401,
    });
  }

  next();
};
