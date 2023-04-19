import React from "react";
import { FaCrown } from "react-icons/fa";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { BsFillPlayFill, BsCcSquareFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-900 text-white mt-12 footer">
        <div className="lg:flex lg:justify-between lg:px-6 px-4 py-4 bg-[#ffffff19">
          <div className="w-full text-justify lg:basis-[55%]">
            <h1 className="border-b max-w-fit mb-1">About Us</h1>
            <p className="text-gray-500 text-sm mb-2">
              Moviehub is free movie shows streaming website with zero ads. It
              allows you{" "}
              <span className="font-bold"> watch movie shows online</span>.{" "}
              <span className="font-bold"> watch movie shows online free</span>{" "}
              in high uality for fre. You can also download full movie shows and
              watch it later if you want.
            </p>
            <p className="italic text-sm text-gray-200">
              This site does not store any files on our server, we only linked
              to the media which is hosted on 3rd party services.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="p-[5px] border rounded-md w-fit border-gray-700">
                  <FaCrown color="green" size={25} />
                </div>
                <p className="text-green-700 text-sm">High Quality</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-[5px] border rounded-md w-fit border-gray-700">
                  <AiTwotoneThunderbolt color="green" size={25} />
                </div>
                <p className="text-green-700 text-sm">Fast Load</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-[5px] border rounded-md w-fit border-gray-700">
                  <BsFillPlayFill color="green" size={25} />
                </div>
                <p className="text-green-700 text-sm">Play Forever</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-[5px] border rounded-md w-fit border-gray-700">
                  <BsCcSquareFill color="green" size={25} />
                </div>
                <p className="text-green-700 text-sm">Multiple Subtitles</p>
              </div>
            </div>
          </div>
          <div className="lg:basis-[40%] mt-4 lg:mt-0">
            <h1 className="border-b max-w-fit">Links</h1>
            <div className="flex justify-between mt-2 text-gray-500">
              <div className="flex flex-col text-sm gap-y-3">
                <span className="cursor-pointer hover:text-blue-300">
                  Movies
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Tv Shows
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Top IMDB
                </span>
              </div>

              <div className="flex flex-col text-sm gap-y-3">
                <span className="cursor-pointer hover:text-blue-300">
                  Action Movies
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Thriller Movies
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Sci-fi Movies
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Horror Movies
                </span>
              </div>

              <div className="flex flex-col text-sm gap-y-3">
                <span className="cursor-pointer hover:text-blue-300">
                  Contact
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Site Map
                </span>
                <span className="cursor-pointer hover:text-blue-300">
                  Terms of service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-base grid place-items-center grid-flow-col p-4">
        <span className="cursor-pointer hover:text-blue-300">Contact</span>
        <span className="cursor-pointer hover:text-blue-300">Site Map</span>
        <span className="cursor-pointer hover:text-blue-300">
          Terms of service
        </span>
      </div>
    </>
  );
};

export default Footer;
