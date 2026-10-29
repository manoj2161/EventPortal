import {
  BookOpen,
  IdCard,
  Layers3,
  Mail,
  Phone,
  User,
  UserCircle,
} from "lucide-react";

export const ProfileDetailsCard = ({ isOrganiser }) => {
  return (
    <>
      <section className="shadow-lg bg-white mt-6 mx-16 rounded-xl">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <User className="size-8" /> Personal Information
        </h1>
        <div className="flex flex-col py-4 p-2">
          <div className="flex gap-36 ">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <UserCircle />
                <div>
                  <p className="text-sm">Full Name</p>
                  <h1 className="font-semibold">Manoj Kumar</h1>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Mail />
                <div>
                  <p className="text-sm">Email Address</p>
                  <h1 className="font-semibold">thakurmanu065@gmail.com</h1>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Phone />
                <div>
                  <p className="text-sm">Phone</p>
                  <h1 className="font-semibold">+91 8091468213</h1>
                </div>
              </div>
            </div>
            <div className="border-l-2 pl-4 flex flex-col gap-4">
              <div className="flex gap-2 items-center ">
                <IdCard />
                <div>
                  <p className="text-sm">
                    {isOrganiser ? "Teacher Id" : "Roll Number"}
                  </p>
                  <h1 className="font-semibold">H230655</h1>
                </div>
              </div>
              {!isOrganiser && (
                <div>
                  <div className="flex gap-2 items-center">
                    <BookOpen />
                    <div>
                      <p className="text-sm">Course</p>
                      <h1 className="font-semibold">BCA</h1>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Layers3 />
                    <div>
                      <p className="text-sm">Semester</p>
                      <h1 className="font-semibold">6th semester</h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
