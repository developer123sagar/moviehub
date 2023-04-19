import React from "react";
import SavedMovies from "../Components/SavedMovies";
import { UserAuth } from "../App";

const Account = () => {
  const {userAccountDet}=UserAuth();

  return (
    <>
      <div className="w-full text-white">
        <img className="w-full h-[400px] object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/61e79073-50cf-4f7b-9a23-73290e6f7dca/1f74657f-bd81-4d73-9a78-20ad01fd584b/NP-en-20230410-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="bg-img" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[400px]">
          <div className="absolute top-[40%] p-2 text-gray-300"><h1 className="text-2xl font-bold ">welcome to Moviehub</h1> <span>{`${userAccountDet.username}`}</span></div>
          <div className="absolute top-[80%] p-2">
            <h1 className="text-2xl font-bold md:text-4xl">My Shows</h1>
          </div>
        </div>
          <SavedMovies />
      </div>
    </>
  );
};

export default Account;
