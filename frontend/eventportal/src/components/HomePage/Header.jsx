import { Bell, CircleUser, ChevronDown, Search } from "lucide-react";
import graduationHat from "../../assets/graduation-hat.png";
import { Link, useNavigate } from "react-router-dom";
export const Header = ({ isOrganiser, setVisible, isStudent, isLogin }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="h-18 shadow rounded flex justify-between items-center">
        <div className="flex jusitfy-between items-center gap-18">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex justify-center items-center gap-4 text-3xl"
          >
            <img className="size-12 ml-14 mt-2" src={graduationHat} alt="" />
            <b>Campulsy</b>
          </div>
        </div>
        <div>
          <nav className="flex gap-6 text-gray-800 font-semibold mr-8">
            <Link className="border-b-2 border-b-yellow-400" to="/">
              Home
            </Link>
            {isOrganiser ? (
              <button onClick={() => setVisible((prev) => !prev)}>
                <Link>Create Event</Link>
              </button>
            ) : (
              <Link to="/login">Events</Link>
            )}
            {isOrganiser && <Link>My Events</Link>}
            {isStudent && <Link>My Registrations</Link>}
            {isOrganiser || (isStudent && <Link to="/profile">Profile</Link>)}
            <Link to="/login">Login</Link>
            {isLogin && <Link to="/">Logout</Link>}
          </nav>
        </div>
        {isLogin && (
          <div className="flex justify-between mr-4 items-center gap-2">
            <div className="relative">
              <Search className="absolute size-4 mt-3 text-gray-500 ml-2" />
              <input
                className="border outline-none border-gray-200 rounded-full text-gray-700 w-68 h-10 text-xs p-1.5 pl-8 bg-gray-100"
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
              <div className="flex items-center gap-4 mr-6 w-48">
                <div>
                  <CircleUser className="size-7" />
                </div>
                <div>
                  <p>Manoj Kumar</p>
                  <p className="text-sm text-gray-500">
                    {isOrganiser ? "Organiser" : "Student"}
                  </p>
                </div>
                <div>
                  <ChevronDown className="size-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
