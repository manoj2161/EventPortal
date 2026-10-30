import { useEffect, useState } from "react";
import { FeaturedEvent } from "./FeaturedEvent";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";
import { getEvents } from "../../api/apiroutes";
import axios from "axios";
import { Loader } from "./Loader";
export const Home = () => {
  const [isOrganiser, setIsOrganiser] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    setTimeout(() => {
      return setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Header
        isOrganiser={isOrganiser}
        isStudent={isStudent}
        isLogin={isLogin}
      />
      <Welcome />
      <FeaturedEvent />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </>
  );
};
