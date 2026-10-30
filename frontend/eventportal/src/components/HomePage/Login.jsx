import graduationHat from "../../assets/graduation-hat.png";
import loginimg from "../../assets/loginimg.png";
import { Link } from "react-router-dom";
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
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Loader } from "./Loader";
import { dashboard, getUsers } from "../../api/apiroutes";
import axios from "axios";
export const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const getResponse = await axios.get(getUsers);
      const users = getResponse.data.data;
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.trim().toLowerCase(),
      );
      if (!existingUser) {
        console.log("User does not exists");
        return;
      }
      console.log(users);
      const verified = existingUser.isVerified;
      console.log(verified);
    } catch (err) {
      console.log(err);
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
        <div className="h-screen w-[40%] h-full flex flex-col justify-center gap-2 pl-[10%]">
          <div className="flex items-center ml-18 gap-4 text-2xl mb-8">
            <img className="size-18" src={graduationHat} alt="" />
            <b className="text-4xl">CAMPUSLY</b>
          </div>
          <div className="ml-8">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="text-gray-400">
              Log in to your account and continue your <br /> campus journey.
            </p>
          </div>
          <form action="" onSubmit={handleSubmit} className="ml-8 mt-8">
            <div className="w-88 h-24  relative flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none"
                placeholder="you@example.com"
              />
              <Mail className="absolute bottom-9 left-2 text-gray-400 size-5" />
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
                className="border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none"
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
            </div>
            <div className="w-88 h-16 flex justify-center ml-26 items-center">
              {/* <div className="flex gap-2">
                <input type="checkbox" name="rememberme" id="" />
                <label htmlFor="rememberme">Remember me</label>
              </div> */}
              <span className="text-gray-400 border-b-2">Forgot password?</span>
            </div>
            <div className="flex items-center justify-center bg-yellow-400 rounded-full w-88 h-10 ">
              <input
                type="submit"
                value="Log In"
                className="text-lg font-semibold"
              />{" "}
              <ArrowRight className="size-5 mt-1 ml-2" />
            </div>
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
    </>
  );
};
