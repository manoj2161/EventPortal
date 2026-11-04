import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isOrganiser, setIsOrganiser] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setIsLogin(true);
    setIsStudent(userData.category === "Student");
    setIsOrganiser(userData.category === "Organiser");
  };

  const logout = () => {
    setUser(null);
    setIsLogin(false);
    setIsStudent(false);
    setIsOrganiser(false);
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          isLogin,
          setIsLogin,
          isStudent,
          setIsStudent,
          isOrganiser,
          setIsOrganiser,
          user,
          setUser,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
