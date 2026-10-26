import { ArrowRight } from "lucide-react";
import collegeimg from "../../assets/collegeimg2.png";
export const Welcome = () => {
  return (
    <>
      <section className="rounded-lg flex justify-between items-center shadow">
        <div className="ml-16">
          <span className="bg-yellow-400 rounded-full text-xs py-1 px-2 font-semibold">
            WELCOME TO CAMPUSLY
          </span>

          <h1 className="text-3xl font-bold mt-2">Discover Events,</h1>
          <h1 className="text-3xl font-bold text-yellow-400">
            Build Connections.
          </h1>
          <p className="mt-4 text-sm">
            Explore engaging events, workshops, and activities <br />
            happening across your campus. Be a part of something bigger.
          </p>
          <button className="bg-yellow-400 rounded-full flex px-4 py-1 items-center gap-2 font-semibold mt-2">
            Explore Events <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="w-188 h-78">
          <img className="w-full h-full" src={collegeimg} alt="" />
        </div>
      </section>
    </>
  );
};
