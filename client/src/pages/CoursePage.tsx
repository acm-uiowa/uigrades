import React, { useEffect, useState, useRef } from 'react';
import BarGraph from '../components/BarGraph.tsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faArrowUpRightFromSquare, faQuestion, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Loading from "../components/Loading.tsx"
import MessagePopup from "../components/MessagePopup.tsx"
import config from '../config.js';
import PromptInfoModal from '../components/PromptInfoModal.tsx';
import { Link } from 'react-router-dom';

import '../App.css';

// this is necessary for correct rerender of similar courses do not delete pwetty pwease - liao
export const dynamic = "force-dynamic";

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

const CoursePage:React.FC = () => {
  const [course, setCourse] = useState<Course>({  id: 0,
    SUBJECT_COURSE_SECTION: '',
    COURSE_TITLE: '',
    PRIMARY_INSTRUCTOR_NAME: '',
    SECONDARY_INSTRUCTOR_NAME: '',
    A_PLUS: '',
    A: '',
    A_MINUS: '',
    B_PLUS: '',
    B: '',
    B_MINUS: '',
    C_PLUS: '',
    C: '',
    C_MINUS: '',
    D_PLUS: '',
    D: '',
    D_MINUS: '',
    F: '',
    WITHDRAWN: '',
    SEMESTER: '',
    YEAR: '',
    IS_NEW: 0
  });
  const [courseGrades, setCourseGrades] = useState<number[]>([])
  const [originalCourseGrades, setOriginalCourseGrades] = useState<number[]>([]) // used to reset the courseGrades state
  const [showingAggregatedGrades, setShowingAggregatedGrades] = useState<boolean>(false) // used to determine if the courseGrades state is showing the aggregated grades or not
  const [classTotal, setClassTotal] = useState<number>(0);
  const [similarCourses, setSimilarCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [aggregatedGrades, setAggregatedGrades] = useState<number[]>([]);
  const [totalAggregatedStudents, setTotalAggregatedStudents] = useState<number>(0); // total number of students in all sections of the course
  const id:number = Number(new URLSearchParams(window.location.search).get("id"));
  const [isNew, setIsNew] = useState(false);
  const [showPromptInfo, setShowPromptInfo] = useState(false);

  // @ts-ignore
  const SERVER:string = config[process.env.NODE_ENV]["SERVER"]; // grab the correct server url based on the environment

  const navigate = useNavigate();

  const pageRef = useRef(null);
  
  const getCourse = async () => {
    if (isNaN(id)) {
        console.log("Invalid 'id' value");
        return;
    }

    setCourse({  
      id: 0,
      SUBJECT_COURSE_SECTION: '',
      COURSE_TITLE: '',
      PRIMARY_INSTRUCTOR_NAME: '',
      SECONDARY_INSTRUCTOR_NAME: '',
      A_PLUS: '',
      A: '',
      A_MINUS: '',
      B_PLUS: '',
      B: '',
      B_MINUS: '',
      C_PLUS: '',
      C: '',
      C_MINUS: '',
      D_PLUS: '',
      D: '',
      D_MINUS: '',
      F: '',
      WITHDRAWN: '',
      SEMESTER: '',
      YEAR: '',
      IS_NEW: 0
    });
    setCourseGrades([]);
    setOriginalCourseGrades([]);
    setAggregatedGrades([]);
    setClassTotal(0);
    setTotalAggregatedStudents(0);
    setIsLoading(true);

    try {
        const res = await fetch(`${SERVER}/courses/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch course data');
        }
        const data = await res.json();
        const fetchedCourse = data['course'];
        const classSize = data['classSize'];
        const fetchedAggregatedGrades = data['aggregatedGrades'];
        const totalStudents = data['totalStudents'];
        const courseGrades: number[] = fetchedCourse[21] == 0 ? [fetchedCourse[5], fetchedCourse[6], fetchedCourse[7], fetchedCourse[8], fetchedCourse[9], fetchedCourse[10], fetchedCourse[11], fetchedCourse[12], fetchedCourse[13], fetchedCourse[14], fetchedCourse[15], fetchedCourse[16], fetchedCourse[17], fetchedCourse[18]] : [fetchedCourse[6], fetchedCourse[9], fetchedCourse[12], fetchedCourse[15], fetchedCourse[18]];

        setCourseGrades(courseGrades);
        setOriginalCourseGrades(courseGrades); // placeholder temp variable since we're switching between aggregated and non-aggregated grades
        setCourse(fetchedCourse);
        setClassTotal(classSize);
        setAggregatedGrades(fetchedAggregatedGrades);
        setTotalAggregatedStudents(totalStudents);  

        const topOfPagePlaceholder = document.getElementById("top-of-page-placeholder");
        if (topOfPagePlaceholder) {
            topOfPagePlaceholder.scrollIntoView({ behavior: "smooth" });
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
    } finally {
        setIsLoading(false);
    }
};

  useEffect(() => {
    setShowingAggregatedGrades(false);
    getCourse();
    setIsNew(course[21] === 1);
  }, []);

  useEffect(() => {
    document.title = `UIGrades | ${course[1]}: ${course[19]} ${course[20]}`;
    getSimilarCourses();
    // setAggregatedGrades([]);
    //@ts-ignore
    pageRef.current.scrollIntoView();
  }, [course]);

  // handles back button click
  useEffect(() => {
    getCourse();
    setShowingAggregatedGrades(false);
  }, [window.location.search]);

  const getSimilarCourses = async () => {
    const res = await fetch(`${SERVER}/similar-courses/${id}`);
    const data = await res.json();
    setSimilarCourses(data);
  };
  
  const toggleShowAggregatedGrades = () => {
    if (showingAggregatedGrades) {
      setCourseGrades(originalCourseGrades);
      setShowingAggregatedGrades(false);
    } else {
      setCourseGrades(aggregatedGrades);
      setShowingAggregatedGrades(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        await getCourse();
        await getSimilarCourses();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
      setIsLoading(false);
    };
  
    fetchData();
  }, []);

  async function handleRowClick(similarCourseId) {
    navigate(`/course?id=${similarCourseId}`);
  }

  // index 5- 19 contain all grades, we can sum these up to get the total number of students ofc w/o including the hyphened data for new courses
  const getTotalForSimilarCourse = (similarCourse): number => {
    return similarCourse
      .slice(5, 19)
      .reduce((acc: number, val: string) => acc + (parseInt(val) || 0), 0);
  };


  return (
    <div ref={pageRef} className="w-full flex justify-center items-center flex-col relative bg-dark min-h-screen">
      {shared && <MessagePopup message="Link copied to clipboard!" />}
      <Navbar />


      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      )}
    
    {courseGrades.length > 0 &&

      <div className={`flex flex-col items-center my-20 w-full`}>
        <div className=" flex flex-col items-center justify-center w-full">

        {courseGrades.length > 0 && (

          <div
            className={`flex items-center flex-col gap-4 w-full text-zinc-300`}
          >
            <div className='flex justify-center font-bold items-center gap-3 md:gap-5 text-2xl md:text-4xl lg:text-5xl flex-col'>
              <div className='flex justify-center items-center gap-2'>
                <h1 className={`text-primary`}>
                  {aggregatedGrades && showingAggregatedGrades ? `${course[1].split(":")[0]}:${course[1].split(":")[1]}` : course[1]}{" "}
                </h1>
                {showPromptInfo && <PromptInfoModal setShowPromptInfo={setShowPromptInfo} />}
                {!showPromptInfo && course[21] == 1 && <span className='flex justify-center items-center gap-2 w-5 h-5 cursor-pointer text-zinc-300 opacity-70 hover:opacity-100 duration-300 transition outline-zinc-300 outline outline-1 rounded-full p-2 text-xs' onClick={() => setShowPromptInfo(true)}>
                      <FontAwesomeIcon icon={faQuestion} />
                  </span>}
              </div>
              <div className='flex justify-center items-end gap-2 text-lg md:text-3xl text-center'>
                <h2 className="text-zinc-300 max-w-100 md:max-w-auto truncate overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {course[2]}{" "}
                </h2>
                <i className='opacity-70 text-sm md:text-xl'>
                  {course[19]} {course[20]}
                </i>
              </div>
            </div>
            <div className={`flex ${aggregatedGrades && showingAggregatedGrades ? "items-center" : "items-start"} justify-start gap-1 text-md md:text-xl flex-col`}>
              <p className="text-zinc-300">{aggregatedGrades && showingAggregatedGrades ? <span className='font-bold'>Primary Instructor</span> : <div><span className='font-bold text-primary'>Primary Instructor: </span>{course[3].split("-")[0]}</div>}</p>
              {course[4] !== "" && (!aggregatedGrades || !showingAggregatedGrades) && <p className='text-zinc-300'><span className='font-bold text-primary'>Course Supervisor: </span>{course[4].split("-")[0]}</p>}
            </div>
          </div>)}

          {/* Graph container */}
          <div
            className={`w-full px-2 md:w-3/5" my-10 flex flex-col justify-center items-center`}
          >
            <div className='flex justify-center items-center gap-5 text-zinc-300 md:flex-row flex-col'>
              <div className='flex justify-center items-center gap-2'>
                <p
                  className={`flex justify-center items-center text-md md:text-lg font-bold opacity-70`}
                >
                  {!showingAggregatedGrades
                    ? `${course[1]} ${course[19]} ${course[20]}`
                    : `All ${course[19]} ${course[20]} Sections`}
                </p>
                <p className="flex justify-center items-center gap-2 opacity-70">
                  <FontAwesomeIcon icon={faUser} className="text-primary" />{" "}
                  {aggregatedGrades && showingAggregatedGrades
                    ? totalAggregatedStudents
                    : classTotal}
                </p>
              </div>
              <div className='flex gap-3 justify-center items-center'>
                <div
                    onClick={() => {
                      setShared(true);
                      var currentURL = window.location.href;
                      navigator.clipboard.writeText(currentURL);
                      setTimeout(() => {
                        setShared(false);
                      }, 2000);
                    }}
                    className="flex justify-center items-center gap-2 cursor-pointer text-zinc-300 opacity-70 hover:opacity-100 duration-300 transition outline-zinc-300 outline outline-1 rounded-md p-2 text-xs w-7 h-7"
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                  </div>
                  <Link
                    to={`https://myui.uiowa.edu/my-ui/courses/dashboard.page?q.academicUnitId=&q.courseSubject=CS&q.courseNumber=4330&q.sectionNumber=&q.keywords=&q.instructors=&q.genEd=&q.sun=false&q.mon=false&q.tue=false&q.wed=false&q.thu=false&q.fri=false&q.sat=false&q.startTime=&q.endTime=&q.arrangedTime=false&q.saturdayAndEvening=false&q.distanceEd=false&q.onWeb=false&q.onIcn=false&q.gis=&q.courseType=&q.wk3=false&q.wk6=false&q.wk8=false&q.offcycle=false&q.onlyOpen=false&q.learningCenter=&q.showHonors=&q.showTile=&q.startDate=&q.sort=COURSE_NUMBER&q.sessionId=&showResults=1`}
                    target='_blank'
                    className="flex justify-center items-center gap-2 cursor-pointer text-zinc-300 opacity-70 hover:opacity-100 duration-300 transition outline-zinc-300 outline outline-1 rounded-md p-2 text-xs w-7 h-7"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Link>
                </div>
            </div>
            <BarGraph course={courseGrades} />

            {/* Toggle Container */}
            {aggregatedGrades.length > 0 && (
            <div className='flex justify-center items-center gap-5 w-full my-5 text-zinc-300 text-center text-sm md:text-md'>
                  <p
                    className={``}
                  >
                    {course[19] + " " + course[20] + " Section"}
                  </p>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={showingAggregatedGrades} onChange={toggleShowAggregatedGrades}/>
                <div className="relative w-11 h-6 rounded-md after:rounded-md bg-zinc-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-primary after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
              </label>
                <p
                  className={``}
                >
                  <span className='text-primary'>All</span> {course[19] + " " + course[20] + " Sections"}
                </p>
                </div>
              )}
          </div>
        </div>
        <div className="justify-center flex flex-col items-center gap-5 w-full">
          {similarCourses.length !== 0 && (
            <h2
              className={`font-bold text-2xl w-full pl-5 text-center text-zinc-300`}
            >
              Similar Courses
            </h2>
          )}
          <div className="gap-5 flex justify-start items-center overflow-auto h-full w-3/4 px-4 no-scrollbar">
            {similarCourses.map((similarCourse, index) => (
              <div
                onClick={() => {
                  handleRowClick(similarCourse[0]);
                }}
                key={index}
                className={`text-zinc-300 bg-zinc-800 rounded-xl my-5 outline-1 outline outline-zinc-300 cursor-pointer opacity-70 hover:opacity-100 transition duration-300 min-w-auto md:min-w-[50%] lg:min-w-[33%] p-5 shadow-lg flex justify-between items-center`}
              >
                <div>
                  <h3 className="font-bold text-primary">{similarCourse[1]}</h3>
                  <p className="max-w-[100px] md:max-w-[150px] lg:max-w-[200px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">{similarCourse[3].split("-")[0]}</p>
                  <p className="description">
                    {similarCourse[19]} {similarCourse[20]}
                  </p>
                </div>
                <div className="ml-5 flex justify-center items-center gap-2 text-md md:text-xl">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-yellow-400"
                  />{" "}
                  <span className="">
                    {getTotalForSimilarCourse(similarCourse)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* add button to filter only by course subject */}

      </div>}
      {courseGrades.length > 0 && (
      <Footer />)}
    </div>
  );
};

export default CoursePage;
