import { ArrowRight, Calendar, Heart, MapPin, User2 } from "lucide-react";
import tech from "../../assets/tech.png";
import campus from "../../assets/campus.png";
import football from "../../assets/football.png";
import graphic from "../../assets/graphic.png";
import publicSpeaking from "../../assets/public.png";
export const UpcomingEventsCard = () => {
  const upcomingEvents = [
    {
      name: "Web Development Workshop",
      date: "25 Oct 2026",
      time: "10:00 AM",
      location: "Seminar Hall, SoET",
      category: "Tech",
      bookedSeats: 120,
      totalSeats: 150,
      img: tech,
    },
    {
      name: "Campus Fest 2026",
      date: "28 Oct 2026",
      time: "05:00 PM",
      location: "University Ground",
      category: "Cultural",
      bookedSeats: 350,
      totalSeats: 500,
      img: campus,
    },
    {
      name: "Inter-College Football Match",
      date: "30 Oct 2026",
      time: "04:00 PM",
      location: "University Sports Ground",
      category: "Sports",
      bookedSeats: 200,
      totalSeats: 200,
      img: football,
    },
    {
      name: "Graphic Design Workshop",
      date: "02 Nov 2026",
      time: "11:00 AM",
      location: "Design Studio, SoET",
      category: "Workshop",
      bookedSeats: 45,
      totalSeats: 80,
      img: graphic,
    },
    {
      name: "Public Speaking Workshop",
      date: "05 Nov 2026",
      time: "02:00 PM",
      location: "Main Auditorium",
      category: "Seminar",
      bookedSeats: 65,
      totalSeats: 100,
      img: publicSpeaking,
    },
  ];
  return (
    <>
      <div className="flex gap-8">
        {upcomingEvents.map((event) => {
          return (
            <div className="relative">
              <div className="w-68 h-38">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={event.img}
                  alt=""
                />
                <button className="absolute bottom-1 left-2 bg-blue-500 rounded-full text-sm px-2 text-white">
                  {event.category}
                </button>
                <button>
                  <Heart className="absolute size-5 text-white right-2 top-2" />
                </button>
              </div>
              <div className="rounded-xl absolute w-68 bg-white pl-2 text-sm font-semibold shadow-md p-2">
                <p>{event.name}</p>
                <p className="flex items-center">
                  <Calendar className="size-4" /> {event.date} | {event.time}
                </p>
                <p className="flex items-center">
                  <MapPin className="size-4" />
                  {event.location}
                </p>
                <p className="flex items-center">
                  <User2 className="size-4" />
                  {event.bookedSeats}/{event.totalSeats}
                  <button className="w-6 h-6 bg-yellow-400 right-2 absolute rounded-full">
                    <ArrowRight className="absolute right-1 bottom-1 size-4" />
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
