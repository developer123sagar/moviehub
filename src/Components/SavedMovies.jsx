import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../App";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AiOutlineClose } from "react-icons/ai";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);

  const { userAccountDet } = UserAuth();
  const moviesId = userAccountDet.id;

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft += 500;
  };

  useEffect(() => {
      onSnapshot(doc(db, "usersInformations",moviesId), (doc) => {
        setMovies(doc.data()?.savedShows);
      });
  }, [moviesId]);

  const movieRef1 = doc(db, "usersInformations", `${userAccountDet.id}`);

  const deleteSavedMovie = async (passedId) => {
    try {
        const result = movies.filter((item) => item.id != passedId);
        await updateDoc(movieRef1, {
          savedShows: result,
        });
    } catch (e) {
      console.loga(e);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">Liked Movies</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={30}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0"
        />
        <div
          id={"slider"}
          className="text-white w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[250px] lg:w-[290px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block rounded group"
                src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                alt={item.title}
              />
              <div className="absolute top-0 w-full h-full hover:bg-black/60 opacity-100" />
              <p className="truncate text-sm mt-1 h-full w-full">
                {item.title}
              </p>
              <p
                onClick={() => deleteSavedMovie(item.id)}
                className="absolute top-4 right-4 text-gray-400 hidden group-hover:block"
              >
                <AiOutlineClose size={20} />
              </p>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={30}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
        />
      </div>
    </>
  );
};

export default SavedMovies;
