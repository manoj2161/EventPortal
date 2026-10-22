import { createHash } from "crypto";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const verifyTokenAuth = async (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;
    if (!authToken) {
      return res.status(401).json({
        isSuccess: false,
        message: "Invalid or expired token",
        statusCode: 401,
      });
    }
    const payload = jwt.verify(authToken, process.env.AUTH_TOKEN);
    const hashedToken = createHash("sha256").update(authToken).digest("hex");
    const user = await User.findOne({
      _id: payload.id,
      authToken: hashedToken,
    });
    if (!user) {
      return res.status(401).json({
        isSuccess: false,
        message: "Invalid or expired token",
        statusCode: 401,
      });
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      category: user.category,
    };
  } catch (error) {
    console.error(error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        isSuccess: false,
        message: "Invalid or expired token",
        statusCode: 401,
      });
    } else {
      return res.status(500).json({
        isSuccess: false,
        message: "Something went wrong",
        statusCode: 500,
      });
    }
  }
  next();
};
