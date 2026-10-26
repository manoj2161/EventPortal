import { FeaturedEvent } from "./FeaturedEvent";
import { Header } from "./Header";
import { UpcomingEvents } from "./UpcomingEvents";
import { Welcome } from "./Welcome";

export const Home = () => {
  return (
    <>
      <Header />
      <Welcome />
      <FeaturedEvent />
      <UpcomingEvents />
    </>
  );
};
