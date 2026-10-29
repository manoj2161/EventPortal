import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPinned,
  User2,
} from "lucide-react";
import tech from "../../assets/tech.png";
// import campus from "../../assets/campus.png";
// import football from "../../assets/football.png";
// import graphic from "../../assets/graphic.png";
// import publicSpeaking from "../../assets/public.png";
export const UpcomingEventsCard = ({
  setVisible,
  isOrganiser,
  upcomingEvents,
}) => {
  return (
    <>
      <div className="flex justify-between">
        {upcomingEvents.map((event) => {
          return (
            <div className="relative h-88 rounded-4xl z-10" key={event._id}>
              <div className="w-78 h-88 rounded-4xl">
                <img
                  className="w-full h-full object-cover rounded-4xl "
                  src={tech}
                  alt=""
                />
                <button className="absolute z-100 top-4 left-4 bg-blue-500 rounded-full text-sm px-2 text-white">
                  {event.category}
                </button>
                <button>
                  <Heart className="absolute size-5 text-white right-4  top-4" />
                </button>
                <div className=" absolute bg-white opacity-90 text-black bottom-0 rounded-b-4xl top- w-78 pl-2 text-sm font-semibold shadow-md p-2">
                  <p className="mb-4 text-lg font-bold">{event.name}</p>
                  <p className="flex items-center">
                    <CalendarDays className="size-4 mr-2" /> {event.eventDate} |{" "}
                    {event.eventTime}
                  </p>
                  <p className="flex items-center mt-2">
                    <MapPinned className="size-4 mr-2" />
                    {event.eventLocation}
                  </p>
                  <p className="flex items-center mt-2">
                    <User2 className="size-4 mr-2" />
                    {event.bookedSeats}/{event.totalSeats}
                    {!isOrganiser && (
                      <button
                        onClick={() => setVisible((prev) => !prev)}
                        className="w-6 h-6 bg-yellow-400 right-4 absolute rounded-full"
                      >
                        <ArrowRight className="absolute right-1 bottom-1 size-4" />
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
