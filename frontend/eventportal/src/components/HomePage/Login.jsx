import graduationHat from "../../assets/graduation-hat.png";
import loginimg from "../../assets/loginimg.png";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeClosed,
  FileText,
  UserGroup,
  Lock,
  Mail,
  CalendarDays,
} from "lucide-react";

import { useState } from "react";

import { AuthLogin } from "./Loader";
import { api } from "../../api/axios";

export const Login = ({ setIsLogin, setIsOrganiser, setIsStudent }) => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [authLoader, setAuthLoader] = useState(false);

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      server: "",
      verification: "",
    }));
  };

  // Handle login

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setAuthLoader(true);
    setErrors({});

    const response = await api.post("/signin", {
      email: formData.email.trim(),
      password: formData.password,
    });

    if (response.data.isSuccess) {
      const category = response.data.category;

      // Set authentication state
      setIsLogin(true);

      // Set the correct user role
      setIsOrganiser(category === "Organiser");
      setIsStudent(category === "Student");

      // Navigate after successful login
      navigate("/dashboard", {
        replace: true,
      });
    } else {
      setErrors({
        server: response.data.message || "Login failed.",
      });
    }
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);

    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      setErrors({
        verification: message || "Please verify your email first.",
      });
    } else {
      setErrors({
        server: message || "Invalid email or password.",
      });
    }
  } finally {
    setAuthLoader(false);
  }
};

  return (
    <section className="flex justify-center">
      {/* Left Section */}
      <div className="h-screen w-[60%] flex flex-col justify-between bg-blue-100">
        <div className="flex justify-center ml-32 gap-4 mt-32">
          <div className="flex gap-6 text-xl">
            <div className="flex flex-col gap-3 bg-white rounded-4xl w-68 p-3">
              <CalendarDays className="size-12 bg-yellow-300 p-2 rounded-full border border-gray-200" />

              <p className="text-gray-500 font-semibold">
                <span className="text-black font-bold text-2xl">
                  Discover Events
                </span>
                <br />
                Find the best events on campus
              </p>
            </div>

            <div className="flex flex-col gap-3 bg-white rounded-4xl bg-orange-100 w-68 p-3">
              <FileText className="size-12 bg-yellow-300 p-2 rounded-full border border-gray-200" />

              <p className="text-gray-500 font-semibold">
                <span className="text-black font-bold text-2xl">
                  Manage Registrations
                </span>
                <br />
                Keep track of your events
              </p>
            </div>

            <div className="flex flex-col gap-3 bg-white rounded-4xl bg-orange-100 w-68 p-3">
              <UserGroup className="size-12 bg-yellow-300 p-2 rounded-full border border-gray-200" />

              <p className="text-gray-500 font-semibold">
                <span className="text-black font-bold text-2xl">
                  Connect & Grow
                </span>
                <br />
                Be a part of the community
              </p>
            </div>
          </div>
        </div>

        <div>
          <img src={loginimg} alt="Campus events" />
        </div>
      </div>

      {/* Right Section */}
      <div className="h-screen w-[40%] flex flex-col justify-center gap-2 pl-[10%]">
        {/* Logo */}
        <div className="flex items-center ml-18 gap-4 text-2xl mb-8">
          <img className="size-18" src={graduationHat} alt="Campusly logo" />

          <b className="text-4xl">CAMPUSLY</b>
        </div>

        {/* Heading */}
        <div className="ml-8">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>

          <p className="text-gray-400">
            Log in to your account and continue your <br />
            campus journey.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="ml-8 mt-8">
          {/* Email */}
          <div className="w-88 h-24 relative flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Mail className="absolute bottom-9 left-2 text-gray-400 size-5" />

            <p className="text-red-500 text-sm py-1">{errors.email}</p>

            <span className="absolute left-13 text-red-500">*</span>
          </div>

          {/* Password */}
          <div className="w-88 h-24 relative flex flex-col">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>

            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none"
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            {show ? (
              <Eye
                onClick={() => setShow(false)}
                className="absolute bottom-9 right-2 text-gray-400 size-5 cursor-pointer"
              />
            ) : (
              <EyeClosed
                onClick={() => setShow(true)}
                className="absolute bottom-9 right-2 text-gray-400 size-5 cursor-pointer"
              />
            )}

            <Lock className="absolute bottom-9 left-2 text-gray-400 size-5" />

            <p className="text-red-500 text-sm py-1">{errors.password}</p>

            <span className="absolute left-22.5 text-red-500">*</span>
          </div>

          {/* Forgot Password */}
          <div className="w-88 h-16 flex justify-center ml-26 items-center">
            <span className="text-gray-400 border-b-2 cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Server Error */}
          {errors.server && (
            <p className="text-red-500 text-sm mb-2">{errors.server}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={authLoader}
            className="flex items-center justify-center bg-yellow-400 rounded-full w-88 h-10 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {authLoader ? (
              <AuthLogin />
            ) : (
              <div className="flex items-center">
                <span className="text-lg font-semibold">Log In</span>

                <ArrowRight className="size-5 ml-2" />
              </div>
            )}
          </button>

          {/* Verification Error */}
          {errors.verification && (
            <p className="text-red-500 text-sm mt-2">{errors.verification}</p>
          )}

          {/* Signup Link */}
          <p className="ml-8 mt-5">
            Don't have an account?
            <Link
              to="/signup"
              className="text-yellow-500 font-semibold border-b-2"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
