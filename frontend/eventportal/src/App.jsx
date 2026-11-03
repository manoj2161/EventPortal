import { Home } from "./components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/HomePage/Login";
import { Signup } from "./components/HomePage/Signup";
import { Dashboard } from "./components/HomePage/Dashboard";
import { Profile } from "./components/HomePage/Profile";
import { EmailVerificationMessagePage } from "./components/HomePage/EmailVerificationMessagePage";
import { useState } from "react";
import {PublicRoute} from "./components/HomePage/PublicRoute";
import { ProtectedRoute } from "./components/HomePage/ProtectedRoute";
function App() {
  const [visible, setVisible] = useState(false);
  const [isOrganiser, setIsOrganiser] = useState("");
  const [isStudent, setIsStudent] = useState("");
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
        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={
              <Login
                isOrganiser={isOrganiser}
                setIsOrganiser={setIsOrganiser}
                isLogin={isLogin}
                isStudent={isStudent}
                setIsStudent={setIsStudent}
                setIsLogin={setIsLogin}
              />
            }
          ></Route>
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<ProtectedRoute />}>
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
        </Route>
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
