import { UpcomingEventsCard } from "./UpcomingEventsCard";

export const UpcomingEvents = ({ setVisible }) => {
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
      <div className="mt-4 mx-15 rounded-md mb-8 h-88">
        <h1 className="mt-8 font-bold text-4xl ">Upcoming Event</h1>
        <section className=" mt-2 rounded-md  flex items-center gap-2">
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
        <div className=" my-2">
          <UpcomingEventsCard setVisible={setVisible} />
        </div>
      </div>
    </>
  );
};
