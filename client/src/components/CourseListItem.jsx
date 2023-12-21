import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useTheme } from "../context/ThemeContext.js";

const CourseListItem = ({course, navigate}) => {

    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        document.title = 'UIGrades | Course List';
    }, []);

    let allLetterGrades = ["A_PLUS", "A", "A_MINUS", "B_PLUS", "B", "B_MINUS", "C_PLUS", "C", "C_MINUS", "D_PLUS", "D", "D_MINUS", "F", "WITHDRAWN"];
    let classTotal = 0;
    for (let i = 0; i < allLetterGrades.length; i++) {
        classTotal += (parseFloat(course[allLetterGrades[i]]));
    }

    return (
      <>
        <div className={`flex justify-center items-start flex-col`}>
          <h1 className="font-bold">{course["SUBJECT_COURSE_SECTION"]} </h1>
          <h2 className="">
            {course["COURSE_TITLE"]}
          </h2>
          <p className="">{course["PRIMARY_INSTRUCTOR_NAME"]}</p>
          <p className="">
            {course["SEMESTER"]} {course["YEAR"]}
          </p>
        </div>
        <p className="items-center flex pl-2">
          <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-xl" />{" "}
          <span className="text-xl pl-1.5">{classTotal}</span>
        </p>
      </>
    );
}

export default CourseListItem