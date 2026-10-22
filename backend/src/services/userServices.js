import { User } from "../models/userModel.js";
import { createHash } from "crypto";
import bcrypt from "bcrypt";
import { departments, course, eventLocations } from "../utils/departments.js";
export const validateFields = async (name, email, password, category) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!name || !email || !password || !category) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (typeof name !== "string") {
    return {
      isSuccess: false,
      message: "Invalid name",
      statusCode: 400,
    };
  }
  if (typeof email !== "string") {
    return {
      isSuccess: false,
      message: "Invalid email address",
      statusCode: 400,
    };
  }
  if (typeof password !== "string") {
    return {
      isSuccess: false,
      message: "Invalid password",
      statusCode: 400,
    };
  }
  if (category !== "Student" && category !== "Organiser") {
    return {
      isSuccess: false,
      message: "Invalid user category",
      statusCode: 400,
    };
  }
  const cleanedName = name.trim();
  const cleanedEmail = email.trim().toLowerCase();
  const cleanedPassword = password.trim();
  const cleanedCategory = category.trim();
  if (!cleanedName || !cleanedEmail || !cleanedPassword || !cleanedCategory) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (!nameRegex.test(cleanedName)) {
    return {
      isSuccess: false,
      message: "Invalid name",
      statusCode: 400,
    };
  }
  if (!emailRegex.test(cleanedEmail)) {
    return {
      isSuccess: false,
      message: "Invalid email address",
      statusCode: 400,
    };
  }
  if (!passwordRegex.test(cleanedPassword)) {
    return {
      isSuccess: false,
      message:
        "Password must contain a Uppercase,lowercase,number,special character and length should be atleast 8 characters",
      statusCode: 400,
    };
  }
  if (cleanedCategory !== "Student" && cleanedCategory !== "Organiser") {
    return {
      isSuccess: false,
      message: "Invalid user category",
      statusCode: 400,
    };
  }
  const existingUser = await User.findOne({ email: cleanedEmail });
  if (existingUser) {
    return {
      isSuccess: false,
      message: "User already exists",
      statusCode: 409,
    };
  }
  const hashPassword = await bcrypt.hash(cleanedPassword, 12);
  return {
    isSuccess: true,
    statusCode: 200,
    data: {
      name: cleanedName,
      email: cleanedEmail,
      password: hashPassword,
      category: cleanedCategory,
    },
  };
};
export const validateLoginFields = async (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !password) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (typeof email !== "string") {
    return {
      isSuccess: false,
      message: "Invalid email address",
      statusCode: 400,
    };
  }
  if (typeof password !== "string") {
    return {
      isSuccess: false,
      message: "Invalid password",
      statusCode: 400,
    };
  }
  const cleanedEmail = email.trim().toLowerCase();
  const cleanedPassword = password.trim();
  if (!cleanedEmail || !cleanedPassword) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (!emailRegex.test(cleanedEmail)) {
    return {
      isSuccess: false,
      message: "Invalid email address",
      statusCode: 400,
    };
  }
  const existingUser = await User.findOne({ email: cleanedEmail });
  if (!existingUser) {
    return {
      isSuccess: false,
      message: "Invalid email or password.",
      statusCode: 401,
    };
  }

  const validatePassword = await bcrypt.compare(
    cleanedPassword,
    existingUser.password,
  );
  if (!validatePassword) {
    return {
      isSuccess: false,
      message: "Invalid email or password.",
      statusCode: 401,
    };
  }
  if (!existingUser.isVerified) {
    return {
      isSuccess: false,
      message:
        "Email is not verified yet. Please verify your email first to log in.",
      statusCode: 403,
    };
  }

  return {
    isSuccess: true,
    statusCode: 200,
    data: {
      id: existingUser._id,
      name: existingUser.name,
      email: cleanedEmail,
      category: existingUser.category,
    },
  };
};
export const hashRefreshToken = (token, refreshToken) => {
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const hashedRefreshToken = createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  return { hashedRefreshToken, hashedToken };
};
export const validateStudentProfileFields = (
  phone,
  rollNo,
  department,
  courses,
  semester,
) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const currentYear = new Date().getFullYear() % 100;
  const earliestYear = currentYear - 4;
  const rollNoRegex = /^H\d{6}$/;
  if (!phone || !rollNo || !department || !courses || !semester) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (!phoneRegex.test(phone)) {
    return {
      isSuccess: false,
      message: "Invalid Phone number",
      statusCode: 400,
    };
  }
  if (
    !rollNoRegex.test(rollNo) ||
    Number(rollNo.slice(1, 3)) < earliestYear ||
    Number(rollNo.slice(1, 3)) > currentYear
  ) {
    return {
      isSuccess: false,
      message: "Invalid roll number",
      statusCode: 400,
    };
  }
  if (!departments.includes(department)) {
    return {
      isSuccess: false,
      message: "Invalid department",
      statusCode: 400,
    };
  }

  if (!course.includes(courses)) {
    return {
      isSuccess: false,
      message: "Invalid Course",
      statusCode: 400,
    };
  }
  if (semester > 12 || semester < 1) {
    return {
      isSuccess: false,
      message: "Invalid semester",
      statusCode: 400,
    };
  }

  return {
    phone,
    rollNo,
    department,
    courses,
    semester,
  };
};
export const validateTeacherProfileFields = (phone, teacherId, department) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone || !teacherId || !department) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (!phoneRegex.test(phone)) {
    return {
      isSuccess: false,
      message: "Invalid Phone number",
      statusCode: 400,
    };
  }
  if (!departments.includes(department)) {
    return {
      isSuccess: false,
      message: "Invalid department",
      statusCode: 400,
    };
  }
  if (!teacherId) {
    return {
      isSuccess: false,
      message: "Invalid teacher id",
      statusCode: 400,
    };
  }
  return {
    phone,
    teacherId,
    department,
  };
};
export const validateEventsFields = (
  organiser,
  name,
  eventDate,
  eventTime,
  eventLocation,
  totalSeats,
  departmentsSelected,
) => {
  if (!organiser) {
    return {
      isSuccess: false,
      message: "Only organisers can create events",
      statusCode: 400,
    };
  }
  if (
    !name ||
    !eventDate ||
    !eventTime ||
    !eventLocation ||
    totalSeats === undefined ||
    totalSeats === null ||
    !Array.isArray(departmentsSelected)
  ) {
    return {
      isSuccess: false,
      message: "Invalid data fields",
      statusCode: 400,
    };
  }
  if (typeof name !== "string" || !name.trim()) {
    return {
      isSuccess: false,
      message: "Invalid event name",
      statusCode: 400,
    };
  }
  if (!eventLocations.includes(eventLocation)) {
    return {
      isSuccess: false,
      message: "Invalid Event location",
      statusCode: 400,
    };
  }
  if (
    departmentsSelected.length === 0 ||
    !departmentsSelected.every((item) => departments.includes(item))
  ) {
    return {
      isSuccess: false,
      message: "Select atleast one valid department",
      statusCode: 400,
    };
  }
  const seats = Number(totalSeats);
  if (seats > 1000 || seats < 2) {
    return {
      isSuccess: false,
      message: "Invalid seats",
      statusCode: 400,
    };
  }
  return {
    isSuccess: true,
    data: {
      name: name.trim(),
      eventDate,
      eventTime,
      eventLocation,
      totalSeats: seats,
      departments: [...new Set(departmentsSelected)],
    },
  };
};
