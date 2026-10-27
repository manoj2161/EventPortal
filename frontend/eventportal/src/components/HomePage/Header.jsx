import { Bell, CircleUser, ChevronDown, Search } from "lucide-react";
import graduationHat from "../../assets/graduation-hat.png";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <>
      <header className="h-14 shadow rounded flex justify-evenly gap-102 items-center">
        <div className="flex jusitfy-between items-center gap-18">
          <div className="flex justify-center items-center gap-4 text-2xl">
            <img className="size-12 ml-14 mt-2" src={graduationHat} alt="" />
            <b>Campulsy</b>
          </div>
        </div>
        <div>
          <nav className="flex gap-8 text-sm text-gray-800 font-semibold">
            <Link className="border-b-2 border-b-yellow-400" to="/">
              Home
            </Link>
            <Link to="/login">Events</Link>
            <Link to="/login">My Registrations</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
        <div className="w-108 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute size-4 mt-2 text-gray-500 ml-2" />
            <input
              className="border outline-none border-gray-200 rounded-full text-gray-700 w-68 text-xs p-1.5 pl-6 bg-gray-100"
              type="search"
              name=""
              id=""
              placeholder="Search events,departments,or organisers..."
            />
          </div>
          <div className="flex gap-6 items-center juistify-center">
            <div>
              <Bell className="size-5" />
            </div>
            <div className="flex items-center gap-1 mr-6">
              <CircleUser className="size-5" />
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
