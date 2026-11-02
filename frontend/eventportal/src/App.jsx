import { Home } from "./components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/HomePage/Login";
import { Signup } from "./components/HomePage/Signup";
import { Dashboard } from "./components/HomePage/Dashboard";
import { Profile } from "./components/HomePage/Profile";
import { EmailVerificationMessagePage } from "./components/HomePage/EmailVerificationMessagePage";
import { useState } from "react";
function App() {
  const [visible, setVisible] = useState(false);
  const [isOrganiser, setIsOrganiser] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isOrganiser={isOrganiser}
              isStudent={isStudent}
              setIsStudent={setIsStudent}
              setIsLogin={setIsLogin}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              isOrganiser={isOrganiser}
              setIsOrganiser={setIsOrganiser}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isOrganiser={isOrganiser}
              setIsOrganiser={setIsOrganiser}
              visible={visible}
              setVisible={setVisible}
              isStudent={isStudent}
              setIsStudent={setIsStudent}
              isLogin={setIsLogin}
              setIsLogin={setIsLogin}
            />
          }
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/emailVerificationPage"
          element={<EmailVerificationMessagePage />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
