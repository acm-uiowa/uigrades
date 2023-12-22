import "../App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faAngleRight} from "@fortawesome/free-solid-svg-icons"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import {useTheme} from "../context/ThemeContext.js"

const Pagination = ({handlePrevPage, handleNextPage, currentPage, totalPages}) => {
  const { isDarkMode, toggleTheme} = useTheme();
  return (
    <div className="flex justify-center items-center mb-20 gap-10 mt-auto">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`bg-yellow-400 rounded-full w-8 h-8 black br-black ${
          currentPage === 1
            ? "bg-yellow-600 cursor-not-allowed"
            : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="flex justify-center items-center">
        <span className={`rounded-full ${
          isDarkMode
            ? "bg-zinc-500 text-white"
            : "bg-stone-50 text-black"
          } w-10 h-10 justify-center flex items-center shadow-md`}>
          {currentPage == 1 ? "-" : currentPage - 1}
        </span>
        <span className={`rounded-full ${
          isDarkMode
            ? "bg-zinc-400 text-white"
            : "bg-white text-black"
          } w-14 h-14 justify-center mx-1 flex items-center shadow-xl`}>
          {currentPage}
        </span>
        <span className={`rounded-full ${
          isDarkMode
            ? "bg-zinc-500 text-white"
            : "bg-stone-50 text-black"
          } w-10 h-10 justify-center flex items-center shadow-md`}>
          {currentPage == totalPages ? "-" : currentPage + 1}
        </span>
      </div>
      <button
        onClick={handleNextPage}
        disabled={totalPages <= 1 || currentPage == totalPages}
        className={`bg-yellow-400 rounded-full w-8 h-8 black br-black ${
          totalPages <= 1 || currentPage == totalPages
            ? "bg-yellow-600 cursor-not-allowed"
            : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}

export default Pagination