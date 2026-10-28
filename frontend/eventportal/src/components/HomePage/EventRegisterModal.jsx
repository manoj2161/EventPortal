import {
  ArrowRight,
  BookOpen,
  BuildingComplex,
  CalendarDays,
  ClipboardCheck,
  IdCard,
  Layers3,
  Mail,
  MapPinned,
  Phone,
  User,
  User2,
  X,
} from "lucide-react";

import tech from "../../assets/tech.png";
export const EventRegisterModal = ({ visible, setVisible }) => {
  return (
    <>
      {visible && (
        <div className="flex items-center justify-center w-screen h-screen fixed z-40 bg-black/20 backdrop-blur-sm">
          <div className="flex">
            <div className="w-150 rounded-xl">
              <div className="w-150 h-100">
                <img
                  className="w-full h-full object-cover rounded-tl-xl"
                  src={tech}
                  alt=""
                />
              </div>
              <div>
                <div className="bg-black text-white opacity-80 w-150 flex flex-col gap-2 p-4 rounded-bl-xl">
                  <h1 className="text-2xl font-bold">
                    Web Development <br />
                    <span className="text-yellow-400"> Workshop</span>
                  </h1>
                  <p>
                    Learn, build, and collaborate with industry exprerts. A
                    hands-on workshop to enhance your web development skills and
                    build real projects.
                  </p>
                  <p className="flex items-center">
                    <CalendarDays className="size-4 mr-2" /> 28 Oct 2026 | 10:00
                    AM
                  </p>
                  <p className="flex items-center mt-2">
                    <MapPinned className="size-4 mr-2" />
                    University Ground
                  </p>
                  <p className="flex items-center mt-2">
                    <User2 className="size-4 mr-2" />
                    45/100{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-150 p-10 h-auto rounded-r-xl bg-white relative">
              <button
                className="absolute right-4 top-4 p-1 bg-white rounded-full hover:bg-yellow-400 "
                onClick={() => setVisible((prev) => !prev)}
              >
                <X />
              </button>
              <form action="">
                <h1 className="text-2xl font-bold">Register for the Event</h1>
                <p className="py-2">
                  Fill in the details below to reserve your spot <br />
                  for this exciting event.
                </p>
                <div>
                  <div className="flex justify-between items-center -mb-2">
                    <div className="w-60 h-24 relative flex flex-col">
                      <label htmlFor="name" className="font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value="Manoj Kumar"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="Enter your full name"
                      />
                      <User className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                    <div className="w-60 h-24 relative flex flex-col">
                      <label htmlFor="name" className="font-semibold">
                        Event Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value="Web Development Workshop"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="Enter event name"
                      />
                      <ClipboardCheck className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="w-60 h-24  relative flex flex-col">
                      <label htmlFor="email" className=" font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value="thakurmanu065@gmail.com"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="you@example.com"
                      />
                      <Mail className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                    <div className="w-60 h-24  relative flex flex-col">
                      <label htmlFor="number" className=" font-semibold">
                        Phone
                      </label>
                      <input
                        type="number"
                        name="number"
                        value={+8091468213}
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="+91 1234567890"
                      />
                      <Phone className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="w-60 h-24  relative flex flex-col">
                      <label htmlFor="rollno" className=" font-semibold">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        name="rollno"
                        value="H230655"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="H123456"
                      />
                      <IdCard className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                    <div className="w-60 h-24  relative flex flex-col">
                      <label htmlFor="department" className=" font-semibold">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value="School of Engineering & Technology"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="eg. School of Engineering & Technology"
                      />
                      <BuildingComplex className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="w-60 h-24  relative flex flex-col">
                      <label htmlFor="course" className=" font-semibold">
                        Course
                      </label>
                      <input
                        type="text"
                        name="course"
                        value="BCA"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="BCA (Bachelor of Computer Applications)"
                      />
                      <BookOpen className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                    <div className="w-60 h-24  relative flex flex-col">
                      <label htmlFor="semester" className=" font-semibold">
                        Semester
                      </label>
                      <input
                        type="text"
                        name="semester"
                        value="6th"
                        className="border w-60 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-sm"
                        placeholder="6th"
                      />
                      <Layers3 className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center bg-yellow-400 rounded-full w-88 h-10 my-4">
                      <input
                        type="submit"
                        value="Register Event"
                        className="text-lg font-semibold"
                      />{" "}
                      <ArrowRight className="size-5 mt-1 ml-2" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
