import {
  validateFields,
  validateLoginFields,
} from "../services/userServices.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { verifyEmail } from "../services/emailServices.js";
export const createUser = async (req, res) => {
  const { name, email, password, category } = req.body;
  try {
    const validateData = await validateFields(name, email, password, category);
    if (validateData.isSuccess === false) {
      return res.status(Number(validateData.statusCode)).json({
        isSuccess: false,
        message: validateData.message,
        statusCode: validateData.statusCode,
      });
    }
    const token = jwt.sign(
      { email: validateData.data.email },
      process.env.EMAIL_VERIFICATION_TOKEN,
      { expiresIn: "15m" },
    );
    const newUser = {
      name: validateData.data.name,
      email: validateData.data.email,
      password: validateData.data.password,
      category: validateData.data.category,
      isVerified: false,
      emailVerificationToken: token,
    };
    await User.create(newUser);
    try {
      await verifyEmail(token, validateData.data.name, validateData.data.email);
    } catch (error) {
      console.error(error);
      return res.status(201).json({
        isSuccess: true,
        emailSent: false,
        message:
          "Account created, but the verification email could not be sent. Please request a new one.",
        data: {
          name: validateData.data.name,
          email: validateData.data.email,
          category: validateData.data.category,
          isVerified: false,
        },
      });
    }
    return res.status(201).json({
      isSuccess: validateData.isSuccess,
      emailSent: true,
      data: {
        name: validateData.data.name,
        email: validateData.data.email,
        category: validateData.data.category,
        isVerified: false,
      },
      message: "A verification mail has been sent to your email address.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        isSuccess: false,
        message: "User already exists",
        statusCode: 409,
      });
    }

    res.status(500).json({
      isSuccess: false,
      message: "Something went wrong",
      statusCode: 500,
    });
    return console.error(error);
  }
};
export const confirmEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token || typeof token !== "string") {
      return res.status(400).json({
        isSuccess: false,
        message: "Verification token is missing",
        statusCode: 400,
      });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.EMAIL_VERIFICATION_TOKEN);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          isSuccess: false,
          message:
            "This verification link has expired. Please request a new one.",
          statusCode: 400,
        });
      }
      return res.status(400).json({
        isSuccess: false,
        message: "This verification link is invalid.",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        isSuccess: true,
        message: "Your email is already verified. You can log in.",
      });
    }

    if (user.emailVerificationToken !== token) {
      return res.status(400).json({
        isSuccess: false,
        message:
          "This verification link is outdated. Please request a new one.",
        statusCode: 400,
      });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Email verified successfully. You can log in.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      isSuccess: false,
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const validateData = await validateLoginFields(email, password);
  if (validateData.isSuccess === false) {
    return res.status(Number(validateData.statusCode)).json({
      isSuccess: false,
      message: validateData.message,
      statusCode: validateData.statusCode,
    });
  }
  const token = jwt.sign({ id: validateData.id }, process.env.AUTH_TOKEN, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { id: validateData.data.id },
    process.env.REFRESH_AUTH_TOKEN,
    { expiresIn: "7d" },
  );
  return res.status(200).json({
    isSuccess: true,
    message: `Welcome ${validateData.data.name}`,
    email: validateData.data.email,
    category: validateData.data.category,
  });
};
