"use client";

import dynamic from "next/dynamic";
import { UsersIcon } from "@heroicons/react/24/solid";
import { BorderContainerLarge } from "@/app/(uigrades-public)/components/BorderContainerLarge";
import { CourseType, GenericCourseType } from "@/db/types";

const GradesChart = dynamic(() => import("./GradesChart"), { ssr: false });

function getMedianGrade(
    students: number,
    gradesList: number[],
    grades: string[],
) {
    let halfStudents = Math.floor(students / 2);
    for (const i in gradesList) {
        halfStudents -= gradesList[i];
        if (halfStudents <= 0) {
            return grades[i];
        }
    }
}

export function GraphCard({
    unique = true,
    courseInformation,
    className,
}: {
    unique?: boolean | undefined;
    courseInformation: CourseType | GenericCourseType;
    className?: string;
}) {
    const gradesValues = Object.values(courseInformation.grades);
    const students = gradesValues.reduce((sum, curr) => sum + curr, 0);
    const medianGrade = getMedianGrade(
        students,
        gradesValues,
        Object.keys(courseInformation.grades),
    );

    return (
        <BorderContainerLarge
            className={`${className} flex w-full flex-col justify-between gap-flex-gap-small bg-secondary-dark-gray px-page-mobile-x md:gap-flex-gap-large`}
        >
            <div className="flex flex-col">
                <h2 className="subheader-web text-hawkeye-gold md:header-2-mobile">
                    {unique
                        ? courseInformation.courseCode
                        : "All " + courseInformation.courseCode + " Sections"}
                </h2>
                <span className="content-normal md:subheader-web">
                    {courseInformation.courseTitle}
                </span>
                <div className="content-small flex flex-col text-light-gray md:content-normal">
                    <span>
                        {"Instructors: " +
                            courseInformation.instructors.join(", ")}
                    </span>
                    <span>
                        {courseInformation.session.split("-").join(" ")}
                    </span>
                    <div className="flex flex-row items-center gap-paragraph-gap pt-paragraph-gap">
                        <UsersIcon className="size-4 flex-shrink-0 text-hawkeye-gold md:size-5" />
                        <span>{students}</span>
                        {medianGrade && <span> - Median: {medianGrade}</span>}
                    </div>
                </div>
            </div>
            <GradesChart grades={courseInformation.grades} />
        </BorderContainerLarge>
    );
}
