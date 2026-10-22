import {
  validateFields,
  validateLoginFields,
  hashRefreshToken,
  validateStudentProfileFields,
  validateTeacherProfileFields,
  validateEventsFields,
} from "../services/userServices.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { verifyEmail } from "../services/emailServices.js";
import { Student } from "../models/studentProfileModel.js";
import { Teacher } from "../models/teacherProfileModel.js";
import { Events } from "../models/eventModel.js";
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
  try {
    const { email, password } = req.body ?? {};
    const validateData = await validateLoginFields(email, password);
    if (validateData.isSuccess === false) {
      return res.status(Number(validateData.statusCode)).json({
        isSuccess: false,
        message: validateData.message,
        statusCode: validateData.statusCode,
      });
    }
    const token = jwt.sign(
      { id: validateData.data.id },
      process.env.AUTH_TOKEN,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id: validateData.data.id },
      process.env.REFRESH_AUTH_TOKEN,
      { expiresIn: "7d" },
    );
    const { hashedToken, hashedRefreshToken } = hashRefreshToken(
      token,
      refreshToken,
    );
    await User.findByIdAndUpdate(validateData.data.id, {
      authToken: hashedToken,
      refreshTokenHash: hashedRefreshToken,
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      isSuccess: true,
      message: `Welcome ${validateData.data.name}`,
      data: {
        name: validateData.data.name,
        email: validateData.data.email,
        category: validateData.data.category,
      },
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

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email category isAdmin",
    );
    return res.status(200).json({ isSuccess: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      isSuccess: false,
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};

export const updateProfile = async (req, res) => {
  const category = req.user.category;
  if (!category) {
    return (
      res.status(401),
      json({
        isSuccess: false,
        message: "Unauthorized User",
        statusCode: 401,
      })
    );
  }
  if (category === "Student") {
    const userId = req.user.id;
    const { phone, rollNo, department, courses, semester } = req.body;

    const validateData = validateStudentProfileFields(
      phone,
      rollNo,
      department,
      courses,
      semester,
    );
    if (validateData.isSuccess === false) {
      return res.status(validateData.statusCode).json({
        isSuccess: false,
        message: validateData.message,
      });
    }

    const student = await Student.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        phone: validateData.phone,
        rollNo: validateData.rollNo,
        department: validateData.department,
        courses: validateData.courses,
        semester: validateData.semester,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      isSuccess: true,
      data: student,
      statusCode: 200,
    });
  }

  if (category === "Organiser") {
    const user = req.user.id;
    const { phone, teacherId, department } = req.body;

    const validateData = validateTeacherProfileFields(
      phone,
      teacherId,
      department,
    );
    if (!validateData) {
      return res.status(404).json({
        isSuccess: false,
        message: "Invalid data fields",
        statusCode: 404,
      });
    }

    const teacher = await Teacher.create({
      user: user,
      phone: validateData.phone,
      rollNo: validateData.rollNo,
      department: validateData.department,
      courses: validateData.courses,
      semester: validateData.semester,
    });

    return res.status(200).json({
      isSuccess: true,
      data: teacher,
      statusCode: 200,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      category: { $in: ["Student", "Organiser"] },
    }).select("name email category");
    if (users.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "No user found",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      isSuccess: true,
      data: users,
      statusCode: 200,
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

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const validateId = await User.findById({ _id: id });
    if (!validateId) {
      return res.status(404).json({
        isSuccess: false,
        message: "Invalid Id",
        statusCode: 404,
      });
    }
    const user = await User.findByIdAndDelete({
      _id: id,
      category: { $in: ["Student", "Organiser"] },
    });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User does not found or cannot be deleted",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      isSuccess: true,
      message: "User deleted Successfully",
      statusCode: 200,
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

export const createEvent = async (req, res) => {
  const { name, eventDate, eventTime, eventLocation, totalSeats, departments } =
    req.body;
  const organiser = req.user.id;
  const validateFields = validateEventsFields(
    organiser,
    name,
    eventDate,
    eventTime,
    eventLocation,
    totalSeats,
    departments,
  );
  try {
    if (validateFields.isSuccess === false) {
      return res.status(Number(validateFields.statusCode)).json({
        isSuccess: false,
        message: validateFields.message,
        statusCode: validateFields.statusCode,
      });
    }
    const newEvent = await Events.create({
      organiser,
      name: validateFields.data.name,
      eventDate: validateFields.data.eventDate,
      eventTime: validateFields.data.eventTime,
      eventLocation: validateFields.data.eventLocation,
      totalSeats: validateFields.data.totalSeats,
      departments: validateFields.data.departments,
    });
    return res.status(201).json({
      isSuccess: true,
      data: newEvent,
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        isSuccess: false,
        message: "An event with this name already exists",
        statusCode: 409,
      });
    }
    return res.status(500).json({
      isSuccess: false,
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};
