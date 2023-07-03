import axios from "axios";
import React, { useEffect, useState } from "react";
import Requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(Requests.requestPopular).then((res) => {
      setMovies(res.data.results);
    });
  }, []);
  console.log(movies)

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full ">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-white text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            {movie?.title}
          </h1>
          <div>
            <button className="border bg-gray-300 text-black py-2 px-5 mr-5 rounded">
              Play
            </button>
            <button className="border  text-white py-2 px-5 rounded">
              Watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm my-1">{movie?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
