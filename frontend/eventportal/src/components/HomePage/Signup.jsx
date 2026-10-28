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
  User,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
export const Signup = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <section className="flex justify-center">
        <div className="h-screen w-[60%] flex flex-col justify-between bg-orange-50">
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
                <FileText className="size-13 bg-yellow-300 p-2 rounded-full border border-gray-200" />
                <p className="text-gray-500 font-semibold">
                  <span className="text-black font-bold text-2xl">
                    Manage Registrations
                  </span>
                  <br />
                  Keep track of your events
                </p>
              </div>
              <div className="flex flex-col gap-3 bg-white  rounded-4xl bg-orange-100 w-68 p-3">
                <UserGroup className="size-13 bg-yellow-300 p-2 rounded-full border border-gray-200" />
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

          <form action="" className="ml-8">
            <div className="w-88 h-24  relative flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="border w-88 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-none"
                placeholder="Enter your full name"
              />
              <User className="absolute bottom-9 left-2 text-gray-400 size-5" />
            </div>
            <div className="w-88 h-24  relative flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
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
            <div className="w-88 flex flex-col justify-between">
              <label
                htmlFor="registerationType"
                className="text-lg font-bold py-1"
              >
                Registration Type
              </label>
              <div className="flex justify-between ">
                <div className="relative flex">
                  <button className="w-42 border border-yellow-500 border-2 px-6 py-2 rounded-xl bg-yellow-100">
                    Student
                  </button>
                </div>
                <div className="relative">
                  <button className="w-42 border border-gray-400 border-2 px-6 py-2 rounded-xl ">
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
