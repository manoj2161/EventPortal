import {
  ArrowRight,
  BookOpen,
  BuildingComplex,
  File,
  IdCard,
  Layers3,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";
import { departments, course, semesters } from "../../departments/departments";
export const ProfileEditModel = ({ visible, setVisible, isOrganiser }) => {
  return (
    <>
      {visible && (
        <div className="flex items-center justify-center w-screen h-screen fixed z-40 bg-black/20 backdrop-blur-sm">
          <div className="w-130 h-160">
            <form action="">
              <div className="w-130 h-160 rounded-3xl bg-white relative">
                <button
                  className="absolute right-4 top-4 p-1 bg-white rounded-full hover:bg-yellow-400 "
                  onClick={() => setVisible((prev) => !prev)}
                >
                  <X />
                </button>
                <form action="">
                  <h1 className="text-2xl font-bold ml-4 pt-10">
                    Edit your Profile
                  </h1>
                  <p className="py-2 pl-4 text-sm">
                    {isOrganiser
                      ? "Fill in the details below to create an event."
                      : `Fill in the details below to reserve your spot ${(<br />)}
                    for this exciting event.`}
                  </p>
                  <div>
                    <div className="flex justify-evenly gap-4 items-center -mb-2">
                      <div className="w-58 h-24 relative flex flex-col">
                        <label htmlFor="name" className="font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value="Manoj Kumar"
                          className="border w-54 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-xs"
                          placeholder="Enter your full name"
                        />
                        <User className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                      </div>
                      <div className="w-54 h-24 relative flex flex-col">
                        <label htmlFor="name" className="font-semibold">
                          Photo
                        </label>
                        <input
                          type="file"
                          name="name"
                          className="pt-3 border w-54 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-xs"
                          placeholder="Enter event name"
                        />
                        <File className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                      </div>
                    </div>
                    <div className="flex justify-evenly items-center gap-6">
                      <div className="w-54 h-24  relative flex flex-col">
                        <label htmlFor="email" className=" font-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value="thakurmanu065@gmail.com"
                          className="border w-54 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-xs"
                          placeholder="you@example.com"
                        />
                        <Mail className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                      </div>
                      <div className="w-54 h-24 relative flex flex-col">
                        <label htmlFor="number" className=" font-semibold">
                          Phone
                        </label>
                        <input
                          type="number"
                          name="number"
                          value={+8091468213}
                          className="border w-54 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-xs"
                          placeholder="+91 1234567890"
                        />
                        <Phone className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                      </div>
                    </div>
                    <div className="flex justify-evenly items-center gap-6">
                      <div className="w-54 h-24  relative flex flex-col">
                        <label htmlFor="rollno" className=" font-semibold">
                          {isOrganiser ? "Teacher Id" : "Roll Number"}
                        </label>
                        <input
                          type="text"
                          name="rollno"
                          value="H230655"
                          className="border w-54 h-10 rounded-lg border-gray-400 pl-8 text-gray-400 outline-yellow-400 text-xs"
                          placeholder="H123456"
                        />
                        <IdCard className="absolute bottom-10.5 left-2 text-gray-400 size-5" />
                      </div>

                      <div className="relative flex h-24 w-54 flex-col">
                        <label htmlFor="department" className="font-semibold">
                          Department
                        </label>

                        <select
                          id="department"
                          name="department"
                          required
                          className="h-10 w-54 rounded-lg border border-gray-400 pl-8 pr-2 text-xs text-gray-700 outline-yellow-400"
                        >
                          <option value="">Select Department</option>

                          {departments.map((department) => (
                            <option key={department} value={department}>
                              {department}
                            </option>
                          ))}
                        </select>

                        <BuildingComplex className="absolute bottom-10.5 left-2 size-5 text-gray-400" />
                      </div>
                    </div>
                    {!isOrganiser && (
                      <div className="flex justify-evenly items-center gap-6">
                        <div className="relative flex h-24 w-54 flex-col">
                          <label htmlFor="department" className="font-semibold">
                            Course
                          </label>

                          <select
                            id="department"
                            name="department"
                            required
                            className="h-10 w-54 rounded-lg border border-gray-400 pl-8 pr-2 text-xs text-gray-700 outline-yellow-400"
                          >
                            <option value="">Select Course</option>

                            {course.map((course) => (
                              <option key={course} value={course}>
                                {course}
                              </option>
                            ))}
                          </select>

                          <BookOpen className="absolute bottom-10.5 left-2 size-5 text-gray-400" />
                        </div>
                        <div className="relative flex h-24 w-54 flex-col">
                          <label htmlFor="department" className="font-semibold">
                            Semester
                          </label>

                          <select
                            id="department"
                            name="department"
                            required
                            className="h-10 w-54 rounded-lg border border-gray-400 pl-8 pr-2 text-xs text-gray-700 outline-yellow-400"
                          >
                            <option value="">Select your Semester</option>

                            {semesters.map((semester) => (
                              <option key={semester} value={semester}>
                                {semester}
                              </option>
                            ))}
                          </select>

                          <Layers3 className="absolute bottom-10.5 left-2 size-5 text-gray-400" />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center bg-yellow-400 rounded-full w-88 h-10 my-4">
                        <input
                          type="submit"
                          value="Update Profile"
                          className="text-lg font-semibold"
                        />{" "}
                        <ArrowRight className="size-5 mt-1 ml-2" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
