import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../components/SearchBar.tsx";
import CourseListItem from "../components/CourseListItem.tsx";
import Pagination from "../components/Pagination.tsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import CourseListLoader from "../components/CourseListLoader.tsx";
import Footer from "../components/Footer.tsx";
import config from "../config.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

interface Course {
  id: number;
  SUBJECT_COURSE_SECTION: string;
  COURSE_TITLE: string;
  PRIMARY_INSTRUCTOR_NAME: string;
  SECONDARY_INSTRUCTOR_NAME: string;
  A_PLUS: string;
  A: string;
  A_MINUS: string;
  B_PLUS: string;
  B: string;
  B_MINUS: string;
  C_PLUS: string;
  C: string;
  C_MINUS: string;
  D_PLUS: string;
  D: string;
  D_MINUS: string;
  F: string;
  WITHDRAWN: string;
  SEMESTER: string;
  YEAR: string;
  IS_NEW: number;
}

interface ApiDataInterface {
  data: Course[],
  totalItems: number
}

const CourseList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [data, setData] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currSearchQuery, setCurrSearchQuery] = useState<string>("");

  const pageSize:number = 9;
  // @ts-ignore
  const SERVER:string = config[process.env.NODE_ENV]["SERVER"]; // grab the correct server url based on the environment

  const pageRef = useRef(null);


  // Function to parse URL parameters
  const parseUrlParams = () => {
    const pageParam = new URLSearchParams(window.location.search).get("page");
    const queryParam = new URLSearchParams(window.location.search).get("q");
    return {
      page: pageParam ? parseInt(pageParam) : 1,
      query: queryParam ? queryParam.toLowerCase() : ""
    };
  };
  
  // Set states of current page and query from the URL
  useEffect(() => {
   const { page, query} = parseUrlParams();

    setCurrentPage(page);
    setCurrSearchQuery(query);
    
    // @ts-ignore
    pageRef.current?.scrollIntoView();
  }, []);

  // Add popstate event listener for browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const { page, query } = parseUrlParams();
      setCurrentPage(page);
      setCurrSearchQuery(query);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Triggers on updating of the query or the page number.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${SERVER}/courses?page=${currentPage}&q=${currSearchQuery}`);

        if (!res.ok) {
          throw new Error("Invalid Request");
        }
        
        const { data, totalItems }: ApiDataInterface = await res.json();
        setData(data);
        setTotalPages(Math.ceil(totalItems / pageSize));
      } catch (err) {
        console.log(err.message);
        if (err.message.includes("Invalid Request")) {
          setCurrentPage(1);
        }
      } finally {
        setLoading(false);
      }
    };

    // Update URL
    const url:string = `/courses?page=${currentPage}${
      currSearchQuery ? "&q=" + currSearchQuery : ""
    }`;
    window.history.pushState({}, "", url);

    // Debounce the fetch when search query changes
    const timeout = setTimeout(() => {
      fetchData();
    }, currSearchQuery ? 200 : 0); // Only debounce for search queries

    return () => clearTimeout(timeout);
  }, [currentPage, currSearchQuery]);

  const handleSearch = async (page:number, q:string) => {
    setCurrSearchQuery(q);
    setCurrentPage(page);
  }

  const getCourses = async (page:number, q:string) => {
    try {
      const res = await fetch(`${SERVER}/courses?page=${page}&q=${q}`);

      // invalid page, default to page 1
      if (!res.ok) {
        throw new Error("Invalid Request");
      }
      const { data, totalItems }: ApiDataInterface = await res.json();
      setData(data);
      setTotalPages(Math.ceil(totalItems / pageSize));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setCurrentPage(1);
      console.log(err.message);
    }
  };

  // page can either be '+1' or '-1' or '1' or 'last'
  const handleChangePage = (page:string) => {
    if (page === "+1") {
      setCurrentPage((prevPage:number) => prevPage + 1);
      getCourses(currentPage + 1, currSearchQuery);
    } else if (page === "-1") {
      setCurrentPage((prevPage:number) => prevPage - 1);
      getCourses(currentPage - 1, currSearchQuery);
    } else if (page === "last") {
      setCurrentPage(totalPages);
      getCourses(totalPages, currSearchQuery);
    } else {
      setCurrentPage(parseInt(page));
      getCourses(parseInt(page), currSearchQuery);
    }
  }

  const navigate = useNavigate();

  const handleCourseClick = async (id:number) => {
    navigate(`/course?id=${id}`);
  };

  return (
    <div ref={pageRef} className="w-full flex justify-start items-center flex-col relative min-h-screen bg-dark">
      <Navbar showHome/>
      <SearchBar
        handleSearch={handleSearch}
        query={currSearchQuery}
      />
      {data.length === 0 && !loading ? (
        <div className="flex flex-col text-center items-center justify-start gap-5 text-zinc-300 mt-20">
        <FontAwesomeIcon icon={faBan} className="text-6xl text-red-500" />
        <h1
          className={`text-4xl font-bold`}
        >
          Page Not Found
        </h1>
        <p className='text-xl max-w-80'>We could not find the page you were looking for. Please try searching again.</p>
      </div>
      ) : (
        loading ? (
        <CourseListLoader />
      ) : (
          <div className="flex flex-col justify-start items-start p-10 mb-5 mt-5 w-full min-h-[32rem]">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-2 w-full h-full">
              {data.map((course: Course, index: number) => (
                <div
                  key={index}
                  onClick={() => handleCourseClick(course[0])}
                  className="outline outline-1 text-zinc-700 flex h-full w-full justify-between items-center cursor-pointer rounded-md transition duration-300 p-4 bg-zinc-800 bg-opacity-70 hover:bg-opacity-100"
                >
                  <CourseListItem course={course} />
                </div>
              ))}
            </div>
        </div>
      )
      )}
      { totalPages > 1 && <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
        />}

      {!loading ? <Footer /> : null}
    </div>
  );
};

export default CourseList;