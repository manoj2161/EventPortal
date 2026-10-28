import { Home } from "./components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/HomePage/Login";
import { Signup } from "./components/HomePage/Signup";
import { Dashboard } from "./components/HomePage/Dashboard";
import { Profile } from "./components/HomePage/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
