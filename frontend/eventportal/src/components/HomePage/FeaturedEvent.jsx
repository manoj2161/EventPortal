import { ArrowRight, CalendarDays, MapPinned } from "lucide-react";
import fest from "../../assets/fest.png";
export const FeaturedEvent = () => {
  return (
    <>
      <h1 className="ml-16 text-4xl my-6 font-bold ">Featured Event</h1>
      <section className="h-100 mx-14 mt-2 rounded-md flex items-center gap-2">
        <div className="w-1/2 h-100 object-cover p-2">
          <img className="w-full h-full rounded-md " src={fest} alt="" />
        </div>
        <div className="w-1/2 h-full flex justify-center pl-18">
          <div className="flex flex-col w-full justify-center gap-6">
            <span className="bg-yellow-400 rounded-full text-center text-xl w-28 ">
              Cultural
            </span>
            <span className="font-bold text-5xl w-188">Music Night 2026</span>
            <span className="text-lg w-188 text-gray-500">
              Live bands. Good food. Great vibes. Don't miss out!
            </span>
            <span className="text-lg text-gray-500 flex gap-2 items-center font-semibold">
              <CalendarDays className="size-6" />
              18 Oct 2025 | 5:00 PM - 10:00 PM
            </span>
            <span className="text-lg font-semibold text-gray-500 flex gap-2 items-center">
              <MapPinned className="size-6 " /> University Ground
            </span>
            <button className="flex gap-1 items-center bg-yellow-400 rounded-full text-md px-1 py-1 font-semibold w-42 pl-6">
              Register Now <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="text-sm px-6 mt-4 items-center h-16 rounded-3xl border border-gray-400 bg-gray-100 mr-8 text-center">
            Seats left
            <br />
            120/150
          </div>
        </div>
      </section>
    </>
  );
};
