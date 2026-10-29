import { useState } from "react";
import { EventRegisterModal } from "./EventRegisterModal";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";

export const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [isOrganiser, setIsOrganiser] = useState(true);
  return (
    <>
      <Header isOrganiser={isOrganiser} setVisible={setVisible} />
      <Welcome />
      <UpcomingEvents setVisible={setVisible} isOrganiser={isOrganiser} />
      <EventRegisterModal
        visible={visible}
        setVisible={setVisible}
        isOrganiser={isOrganiser}
      />
    </>
  );
};
