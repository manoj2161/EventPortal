import { UpcomingEventsCard } from "./UpcomingEventsCard";

export const UpcomingEvents = () => {
  const categories = [
    "All",
    "Tech",
    "Culture",
    "Sports",
    "Workshops",
    "Seminar",
  ];
  return (
    <>
      <div className="mt-4 mx-2 rounded-md mb-8 h-88">
        <h1 className="ml-2 mt-2 font-bold">Upcoming Event</h1>
        <section className="mx-2 mt-2 rounded-md  flex items-center gap-2">
          <div className="m-2 flex gap-2">
            {categories.map((category) => {
              return (
                <button className="border border-gray-200 hover:bg-yellow-400 rounded-full px-5 text-sm py-1 flex gap-2">
                  {category}
                </button>
              );
            })}
          </div>
        </section>
        <div className="mx-2 my-2">
          <UpcomingEventsCard />
        </div>
      </div>
    </>
  );
};
