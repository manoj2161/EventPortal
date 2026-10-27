import graduationHat from "../../assets/graduation-hat.png";
import loginimg from "../../assets/loginimg.png";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Eye,
  EyeClosed,
  FileText,
  UserGroup,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
export const Login = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <section className="flex justify-center">
        <div className="h-screen w-[60%] flex flex-col justify-between bg-orange-50">
          <div className="flex justify-center items-center gap-4 text-2xl">
            <img className="size-18 ml-14 mt-2" src={graduationHat} alt="" />
            <b className="text-3xl ">Campulsy</b>
          </div>
          <div className="flex flex-col ml-32 gap-4">
            <h1 className="text-5xl font-bold">Welcome Back!</h1>
            <p className="text-gray-400">
              Log in to your account and continue your <br /> campus journey.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="size-10 bg-yellow-300 p-2 rounded-full border border-gray-200" />
                <p className="text-gray-500 font-semibold">
                  <span className="text-black font-bold text-xl">
                    Discover Events
                  </span>
                  <br />
                  Find the best events on campus
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="size-10 bg-yellow-300 p-2 rounded-full border border-gray-200" />
                <p className="text-gray-500 font-semibold">
                  <span className="text-black font-bold text-xl">
                    Manage Registrations
                  </span>
                  <br />
                  Keep track of your events
                </p>
              </div>
              <div className="flex items-center gap-2">
                <UserGroup className="size-10 bg-yellow-300 p-2 rounded-full border border-gray-200" />
                <p className="text-gray-500 font-semibold">
                  <span className="text-black font-bold text-xl">
                    Connect & Grow
                  </span>{" "}
                  <br /> Be a part of the community
                </p>
              </div>
            </div>
          </div>
          <div>
            <img src={loginimg} />
          </div>
        </div>
        <div className="h-screen w-[40%] h-full flex flex-col justify-center gap-8 pl-[10%]">
          <h1 className="text-5xl ml-8 mt-2 font-bold">Login</h1>
          <p className="ml-8 mt-2">
            Don't have an account?
            <Link
              to="/signup"
              className="text-yellow-500 font-semibold border-b-2 "
            >{" "}Sign up
            </Link>
          </p>

          <form action="" className="ml-8 mt-8">
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
                  "absolute bottom-9 right-1 text-gray-400 size-5",
                  show ? "block" : "hidden",
                )}
              />
              <EyeClosed
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className={clsx(
                  "absolute bottom-9 right-1 text-gray-400 size-5",
                  show ? "hidden" : "block",
                )}
              />
              <Lock className="absolute bottom-9 left-2 text-gray-400 size-5" />
            </div>
            <div className="w-88 h-16 flex justify-between items-center">
              <div className="flex gap-2">
                <input type="checkbox" name="rememberme" id="" />
                <label htmlFor="rememberme">Remember me</label>
              </div>
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
          </form>
        </div>
      </section>
    </>
  );
};
