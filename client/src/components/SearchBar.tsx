import "../App.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  handleSearch: (page: number, query: string) => void;
  setCurrentPage: (page: number) => void;
  query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, setCurrentPage, query }) => {
  const { isDarkMode } = useTheme();

  const clearInput = () => {
    handleSearch(1, "");
    setCurrentPage(1);
    window.history.replaceState({}, "", `/courses?page=1`);
  };

  return (
    <div
      className={`flex items-center justify-between rounded-full gap-2 px-4 py-2 w-80 ${
        isDarkMode ? "bg-zinc-600" : "bg-white"
      } absolute top-20 shadow-lg`}
    >
      <div className="flex justify-center items-center w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className={`${isDarkMode ? "text-stone-50" : "text-stone-600"}`}
        />
        <input
          className={`${isDarkMode ? "bg-zinc-600 text-stone-50" : "text-stone-600"} focus:outline-none text-md pl-2 w-full`}
          id="searchBar"
          type="text"
          placeholder="ex. CS 1210 Fall 2022"
          value={query}
          onChange={(e) => {
            handleSearch(1, e.target.value);
            setCurrentPage(1);
          }}
          autoComplete="off"
          autoFocus
        />
      </div>
      <FontAwesomeIcon
        icon={faBackspace}
        className={`${isDarkMode ? "text-stone-50" : "text-stone-600"} cursor-pointer hover:text-stone-400 transition duration-300`}
        onClick={clearInput}
      />
    </div>
  );
};

export default SearchBar;