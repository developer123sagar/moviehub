import React, { createContext, useContext, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./Components/ProtectedRoute";
import { app } from "./firebase";

const AppState = createContext();
const auth = getAuth(app);
export function UserAuth() {
  return useContext(AppState);
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userAccountDet, setUserAccountDet] = useState({});
  const [userInfo, setUserInfo] = useState({});

  function AuthContextProvider({ children }) {
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUserInfo(currentUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);

    const values = {
      isLogin,
      setIsLogin,
      userAccountDet,
      setUserAccountDet,
      userInfo,
      setUserInfo,
    };

    return <AppState.Provider value={values}>{children}</AppState.Provider>;
  }

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
     
      </AuthContextProvider>
    </>
  );
}

export default App;
