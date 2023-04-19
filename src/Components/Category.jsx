import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";
import { UserAuth } from "../App";
import swal from "sweetalert";

const Category = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { userAccountDet, isLogin } = UserAuth();

  const movieId = doc(db, "usersInformations", `${userAccountDet.id}`);

  const savedMovieShows = async () => {
    if (isLogin) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      swal({
        title: "Please Login to Save the Movie !",
        icon: "info",
        buttons: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[250px] lg:w-[290px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full h-auto block rounded"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className="absolute top-0 w-full h-full hover:bg-black/60 opacity-100" />
        <p className="truncate text-sm mt-1 h-full w-full">{item?.title}</p>
        <p onClick={savedMovieShows}>
          {like ? (
            <FaHeart className="absolute top-4 left-4" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4" />
          )}
        </p>
      </div>
    </>
  );
};

export default Category;
