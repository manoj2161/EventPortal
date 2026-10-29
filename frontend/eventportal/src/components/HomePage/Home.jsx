import { useState } from "react";
import { FeaturedEvent } from "./FeaturedEvent";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";

export const Home = () => {
  const [isOrganiser, setIsOrganiser] = useState(true);
  return (
    <>
      <Header isOrganiser={isOrganiser} />
      <Welcome />
      <FeaturedEvent />
      <UpcomingEvents />
    </>
  );
};
