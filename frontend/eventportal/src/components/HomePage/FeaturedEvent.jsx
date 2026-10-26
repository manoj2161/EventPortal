import { ArrowRight, Calendar, MapPin } from "lucide-react";
import fest from "../../assets/fest.png";
export const FeaturedEvent = () => {
  return (
    <>
      <h1 className="ml-2 mt-2 font-bold">Featured Event</h1>
      <section className="mx-2 mt-2 rounded-md flex items-center gap-2">
        <div className="w-128 h-56 p-2">
          <img className="w-full h-full rounded-md " src={fest} alt="" />
        </div>
        <div className="w-full flex justify-between gap-250">
          <div className="flex flex-col gap-1">
            <span className="bg-yellow-400 rounded-full text-center text-sm w-18">
              Cultural
            </span>
            <span className="font-bold">Music Night 2205</span>
            <span className="text-sm text-gray-500">
              Live bands. Good food. Great vibes.
              <br />
              Don't miss out!
            </span>
            <span className="text-sm text-gray-500 flex gap-2 items-center">
              <Calendar className="size-4 text-black" />
              18 Oct 2025 | 5:00 PM - 10:00 PM
            </span>
            <span className="text-sm text-gray-400 flex gap-2 items-center">
              <MapPin className="text-black size-4 " /> University Ground
            </span>
            <button className="flex gap-1 items-center bg-yellow-400 rounded-full text-sm px-1 py-1 font-semibold w-32 pl-3">
              Register Now <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
        <div className="w-38 flex pl-2 items-center h-16 rounded-lg bg-gray-100 mr-8 text-center">
          Seats left
          <br />
          120/150
        </div>
      </section>
    </>
  );
};
