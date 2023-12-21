import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faArrowLeft,
  faBars,
  faX,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.js";

// okay so now this is cheating, but essentially to avoid the issue where the search query gets deleted, but the user hits the back button still and nothing happens, i am making the course list page its own unique navbar
// this is not scalable but should work for an application like this
const CourseListNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex justify-between items-center w-full p-4 h-14 absolute top-0 left-0">
      <div className="flex justify-start items-center md:w-1/3 ml-5">
        <Link
          to="/"
          className={`text-xl ${
            isDarkMode
              ? "text-gray-400 hover:text-gray-300"
              : "hover:text-black text-gray-500"
          } transition duration-200 ease-in-out`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <Link
        to="/"
        className="flex items-center justify-center mx-auto font-bold text-3xl md:w-1/3"
      >
        <h1 className="text-yellow-400">UI</h1>
        <p className={`${isDarkMode ? "text-zinc-200" : "text-zinc-700"}`}>
          Grades
        </p>
      </Link>
      <div
        className="md:hidden block w-10 flex justify-end mr-1 items-center transition-all duration-300 ease-in-out"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon
          icon={showMenu ? faX : faBars}
          className={`${
            isDarkMode ? "text-zinc-400 hover:text-zinc-300" : ""
          } text-xl text-gray-500 hover:text-black transition duration-200 ease-in-out cursor-pointer`}
        />
      </div>
      <ul
        className={`md:justify-end items-end md:items-center w-1/3 md:gap-8 gap-4 mr-5 hidden md:flex`}
      >
        <Link
          to="/contact"
          className="text-gray-500 hover:text-black transition duration-200 ease-in-out"
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="text-gray-500 hover:text-black transition duration-200 ease-in-out"
        >
          About
        </Link>
        <div
          className="flex justify-center items-center text-xl w-5 cursor-pointer text-zinc-700 hover:text-zinc-800 tranisiton duration-200"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </div>
      </ul>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden ${
          showMenu ? "block" : "hidden"
        } items-center z-50 flex flex-col justify-center absolute top-[50%] right-0 mr-5 mt-5 border-2 ${
          isDarkMode
            ? "bg-zinc-800 border-zinc-400"
            : "bg-stone-100 border-zinc-300"
        } rounded-md w-40`}
      >
        <Link
          to="/contact"
          className={`${
            isDarkMode ? "hover:text-zinc-200" : ""
          } text-gray-500 hover:text-black transition duration-200 ease-in-out w-full h-full text-center p-3 border-b-2 ${
            isDarkMode
              ? "border-zinc-400 hover:border-zinc-300"
              : "hover:border-zinc-400"
          } `}
        >
          Contact
        </Link>
        <Link
          to="/about"
          className={`${
            isDarkMode ? "hover:text-zinc-200" : ""
          } text-gray-500 hover:text-black transition duration-200 ease-in-out w-full h-full text-center p-3 border-b-2 ${
            isDarkMode
              ? "border-zinc-400 hover:border-zinc-300"
              : "hover:border-zinc-400"
          } `}
        >
          About
        </Link>
        <div className="cursor-pointer flex justify-center items-center text-xl w-full h-full text-center p-3 border-zinc-600 hover:border-zinc-400" onClick={toggleTheme}>
          <div
            className="flex justify-center items-center">
            <FontAwesomeIcon
              className={`${
                isDarkMode
                  ? "hover:text-zinc-200 text-zinc-500"
                  : "hover:text-zinc-700"
              } tranisiton duration-200`}
              icon={isDarkMode ? faSun : faMoon}
            />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default CourseListNavbar;
