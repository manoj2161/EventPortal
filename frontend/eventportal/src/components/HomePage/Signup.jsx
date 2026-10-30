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
  User,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Loader } from "./Loader";
import axios from "axios";
import { createUser, getUsers } from "../../api/apiroutes";
export const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [category, setcategory] = useState("Student");
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain a Uppercase,lowercase,number,special character and length should be atleast 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const data = {
      ...formData,
      category: category,
    };
    try {
      const getResponse = await axios.get(getUsers);
      const users = getResponse.data.data;
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.trim().toLowerCase(),
      );
      if (existingUser) {
        setErrors((prev) => ({
          ...prev,
          email: "User already exists",
          server: "",
        }));
        return;
      }
      const response = await axios.post(createUser, data);
      console.log(response);
      navigate("/emailVerificationPage");
    } catch (err) {
      const message = err.response?.data?.message || "";

      if (
        err.response?.status === 409 ||
        message.toLowerCase().includes("already exists") ||
        message.toLowerCase().includes("duplicate")
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "Email already registered",
          server: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          server: message || "Registration failed. Please try again.",
        }));
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      return setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <section className="flex justify-center">
        <div className="h-screen w-[60%] flex flex-col justify-between bg-blue-100">
          <div className="flex justify-center ml-32 gap-4 mt-32">
            <div className="flex gap-6 text-xl">
              <div className="flex flex-col gap-3 bg-white  rounded-4xl  w-68 p-3">
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
              <div className="flex flex-col gap-3 bg-white  rounded-4xl bg-orange-100 w-68 p-3">
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
            <img src={loginimg} />
          </div>
        </div>
        <div className="h-screen w-[40%] h-full flex flex-col justify-center gap-8 pl-[10%]">
          <div className="flex ml-18 items-center gap-4 text-2xl">
            <img className="size-18" src={graduationHat} alt="" />
            <b className="text-3xl">Campulsy</b>
          </div>
          <div>
            <h1 className="text-3xl font-bold ml-8">
              Create your <br /> Account
            </h1>
            <p className="text-gray-400 ml-8">
              Join Campusly and never miss out on <br /> your favourite events.
            </p>
          </div>

          <form action="" onSubmit={handleSubmit} className="ml-8">
            <div className="w-88 h-24  relative flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={clsx(
                  "border-2 w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400",
                  errors.name && "border-2 border-red-500",
                )}
                placeholder="Enter your full name"
              />
              <User className="absolute bottom-9 left-2 text-gray-400 size-5" />
              <p className="text-red-500 text-sm py-1">{errors.name}</p>
              <span className="text-red-500 absolute left-23">*</span>
            </div>
            <div className="w-88 h-24  relative flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={clsx(
                  "border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none",
                  errors.email && "border-2 border-red-500",
                )}
                placeholder="you@example.com"
              />
              <Mail className="absolute bottom-9 left-2 text-gray-400 size-5" />
              <p className="text-red-500 text-sm py-1">{errors.email}</p>
              <span className="text-red-500 absolute left-13">*</span>
            </div>
            <div className="w-88 h-24 relative flex flex-col">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={clsx(
                  "border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none",
                  errors.password && "border-2 border-red-500",
                )}
                placeholder="Enter your password"
              />
              <Eye
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className={clsx(
                  "absolute bottom-9 right-2 text-gray-400 size-5",
                  show ? "block" : "hidden",
                )}
              />
              <EyeClosed
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className={clsx(
                  "absolute bottom-9 right-2 text-gray-400 size-5",
                  show ? "hidden" : "block",
                )}
              />
              <Lock className="absolute bottom-9 left-2 text-gray-400 size-5" />
              <p className="text-red-500 text-sm py-1">{errors.password}</p>
              <span className="text-red-500 absolute left-22.5">*</span>
            </div>
            <div className="w-88 flex flex-col justify-between">
              <label
                htmlFor="registerationType"
                className="text-lg font-bold py-1"
              >
                Registration Type
              </label>
              <div className="flex justify-between ">
                <div className="relative flex">
                  <button
                    type="button"
                    onClick={() => setcategory("Student")}
                    className={clsx(
                      "w-42 border border-gray-400 border-2 px-6 py-2 rounded-xl",
                      category === "Student" &&
                        "border-yellow-500 bg-yellow-100",
                    )}
                  >
                    Student
                  </button>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setcategory("Organiser")}
                    className={clsx(
                      "w-42 border border-gray-400 border-2 px-6 py-2 rounded-xl",
                      category === "Organiser" &&
                        "border-yellow-500 bg-yellow-100",
                    )}
                  >
                    Organiser
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center bg-yellow-400 rounded-full w-88 h-10 my-4">
              <input
                type="submit"
                value="Create Account"
                className="text-lg font-semibold"
              />{" "}
              <ArrowRight className="size-5 mt-1 ml-2" />
            </div>
            <p className="text-red-500 text-sm py-1 ml-16">{errors.server}</p>
            <p className="ml-8">
              Already have an account?
              <Link
                to="/login"
                className="text-yellow-500 font-semibold border-b-2 "
              >
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
