import { ArrowRight } from "lucide-react";
import collegeimg from "../../assets/collegeimg2.png";
export const Welcome = () => {
  return (
    <>
      <section className="rounded-lg flex justify-between items-center shadow">
        <div className="ml-16">
          <span className="rounded-full text-3xl font-bold">
            WELCOME TO CAMPUSLY
          </span>

          <h1 className="text-3xl font-bold mt-8">Discover Events,</h1>
          <h1 className="text-3xl font-bold text-yellow-400 mt-2">
            Build Connections.
          </h1>
          <p className="mt-4 text-md">
            Explore engaging events, workshops, and activities <br />
            happening across your campus. Be a part of something bigger.
          </p>
          <button className="bg-yellow-400 rounded-full flex px-4 py-1 items-center gap-2 font-semibold mt-4">
            Explore Events <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="w-300 h-108">
          <img className="w-full h-full object-cover" src={collegeimg} alt="" />
        </div>
      </section>
    </>
  );
};
