import { useEffect, useState } from "react";
import { EventRegisterModal } from "./EventRegisterModal";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";
import axios from "axios";
import {getEvents} from "../../api/apiroutes";
export const Dashboard = () => {
  const [visible, setVisible] = useState(false);
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
      <Header isOrganiser={isOrganiser} setVisible={setVisible} />
      <Welcome />
      <UpcomingEvents
        upcomingEvents={upcomingEvents}
        setVisible={setVisible}
        isOrganiser={isOrganiser}
      />
      <EventRegisterModal
        visible={visible}
        setVisible={setVisible}
        isOrganiser={isOrganiser}
      />
    </>
  );
};
