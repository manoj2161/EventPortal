import { Home } from "./components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/HomePage/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
