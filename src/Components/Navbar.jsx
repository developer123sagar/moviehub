import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../App";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = UserAuth();

  const handleLogOut = async () => {
    const yesNo = prompt("Are you sure you want to log out ? Yes or No ");
    if (yesNo === "yes") {
      await signOut(auth);
      setIsLogin(false);
      navigate("/");
    }else{
      return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-2 z-[100] absolute w-full">
      <Link to="/">
        <h1 className="text-red-500 text-2xl sm:text-4xl cursor-pointer font-bold">
          Moviehub
        </h1>
      </Link>
      {isLogin ? (
        <>
          <div>
            <button
              onClick={handleLogOut}
              className="text-white md:text-lg px-3 sm:px-6 py-2"
            >
              Log Out
            </button>
            <Link to="/account">
              <button className="bg-blue-400 md:text-lg px-2 py-2 md:px-4 rounded-md">
                Account
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/login">
              <button className="text-white px-6 py-2">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-400 px-4 py-2 rounded-md">
                Sign Up
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
