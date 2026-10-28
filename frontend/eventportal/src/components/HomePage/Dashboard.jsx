import { useState } from "react";
import { EventRegisterModal } from "./EventRegisterModal";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";

export const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="relative">
        <Header />
        <Welcome />
        <UpcomingEvents setVisible={setVisible} />
        <div className="absolute z-100 top-0">
            <EventRegisterModal visible={visible} setVisible={setVisible} />
        </div>
      </div>
    </>
  );
};
