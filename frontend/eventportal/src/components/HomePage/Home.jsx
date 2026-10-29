import { useEffect, useState } from "react";
import { FeaturedEvent } from "./FeaturedEvent";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";
import { getEvents } from "../../api/apiroutes";
import axios from "axios";
export const Home = () => {
  const [isOrganiser, setIsOrganiser] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const getUpcomigEvents = async () => {
      try {
        const events = (await axios.get(getEvents)) || [];
        if (!events) {
          return console.log("No events found");
        }
        setUpcomingEvents(events.data.data);
        console.log(events.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUpcomigEvents();
  }, []);

  return (
    <>
      <Header isOrganiser={isOrganiser} />
      <Welcome />
      <FeaturedEvent />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </>
  );
};
