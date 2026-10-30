import { Link } from "react-router-dom";

export const EmailVerificationMessagePage = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className=" p-16 rounded-lg shadow-xl">
          <p className="text-yellow-400 font-semibold">
            An Email Verification Link has been sent to your email address.{" "}
            <br />
            Please verfiy the link before Login. <br />{" "}
            <span className="border-b text-blue-400">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
