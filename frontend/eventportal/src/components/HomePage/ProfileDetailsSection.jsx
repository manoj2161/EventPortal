import { Landmark, Mail, PenIcon, Phone } from "lucide-react";
import profile from "../../assets/profile.jpg";
export const ProfileDetailsSection = () => {
  return (
    <>
      <section className="rounded-lg shadow-lg mx-16 h-54 relative">
        <div className="flex items-center h-54 ml-8 gap-8">
          <div className="w-38 rounded-full border-4 border-yellow-400">
            <img
              src={profile}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-2xl font-bold ">Manoj Kumar</h1>
              <span>Student</span> |{" "}
              <span>Career Point University, Hamirpur</span>
            </div>
            <p className="flex gap-4 items-center">
              <div className="flex gap-2">
                <Mail className="size-5" />
                thakurmanu065@gmail.com{" "}
              </div>
              <div className="flex gap-2">
                <Phone className="size-5" />
                +91 8091468213
              </div>
            </p>
            <div className=" rounded-full w-88 py-1 ">
              <p className="flex gap-2">
                <Landmark />
                School of Engineering & Technology
              </p>
            </div>
          </div>
        </div>
        <button className="flex gap-2 items-center absolute top-4 right-6">
          <PenIcon className="size-5"/>
          Edit Profile
        </button>
      </section>
    </>
  );
};
