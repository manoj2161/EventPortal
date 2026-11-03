import { Bell, CircleUser, ChevronDown, Search } from "lucide-react";

import graduationHat from "../../assets/graduation-hat.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api/axios";
import { signout } from "../../api/apiroutes";

export const Header = ({
  isOrganiser,
  setVisible,
  isStudent,
  isLogin,
  setIsLogin,
}) => {
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);

      const response = await api.patch(signout);

      if (response.data.isSuccess) {
        setIsLogin(false);
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <header className="min-h-[72px] shadow rounded flex justify-between items-center bg-white">
      {/* Logo */}
      <div className="flex justify-between items-center gap-18">
        <div
          onClick={() => navigate("/")}
          className="flex justify-center items-center gap-4 text-3xl cursor-pointer"
        >
          <img
            className="size-12 ml-14 mt-2"
            src={graduationHat}
            alt="Campusly logo"
          />

          <b>Campusly</b>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-6 text-gray-800 font-semibold mr-8 items-center">
        <Link className="border-b-2 border-b-yellow-400" to="/">
          Home
        </Link>

        {isLogin && isOrganiser ? (
          <button type="button" onClick={() => setVisible((prev) => !prev)}>
            Create Event
          </button>
        ) : (
          <Link to="/login">Events</Link>
        )}

        {isLogin && isOrganiser && <Link to="/dashboard">My Events</Link>}

        {isLogin && isStudent && <Link to="/dashboard">My Registrations</Link>}

        {isLogin && <Link to="/profile">Profile</Link>}

        {/* Login / Logout */}
        {isLogin ? (
          <Link to="/login" className="hover:text-yellow-600 transition">
            Login
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            className="disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2 rounded-lg transition"
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        )}
      </nav>

      {/* Logged-in user information */}
      {isLogin && (
        <div className="flex justify-between mr-4 items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute size-4 mt-3 text-gray-500 ml-2" />

            <input
              className="border outline-none border-gray-200 rounded-full text-gray-700 w-68 h-10 text-xs p-1.5 pl-8 bg-gray-100"
              type="search"
              placeholder="Search events, departments, or organisers..."
            />
          </div>

          {/* Notifications and Profile */}
          <div className="flex gap-6 items-center justify-center">
            <button type="button">
              <Bell className="size-5" />
            </button>

            <div className="flex items-center gap-4 mr-6 w-48">
              <CircleUser className="size-7" />

              <div>
                <p>Manoj Kumar</p>

                <p className="text-sm text-gray-500">
                  {isOrganiser ? "Organiser" : "Student"}
                </p>
              </div>

              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
