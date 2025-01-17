"use server";

import { Suspense } from "react";
import { CourseTable } from "./components/CourseTable";
import { SearchBar } from "./components/SearchBar";
import { SearchFilters } from "./components/SearchFilters";
import queries from "@/db/queries";

const allSubjects = queries.courses.allSubjects();
const allSessions = queries.courses.allSessions();
const allInstructors = queries.courses.allInstructors();

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const queriesCourses = queries.courses.courses(await searchParams);
    const courseCount = await queries.courses.courseCount(await searchParams);

    return (
        <div className="flex flex-col md:flex-row md:gap-page-web-x">
            <div className="sticky top-[calc(4rem)] -mt-8 flex w-full flex-col gap-flex-gap-large self-start bg-primary-dark-gray py-8 md:top-[calc(4rem+3.25rem)] md:mt-0 md:w-1/4 md:py-0">
                <p className="subheader-mobile hidden md:subheader-web md:block">
                    <span className="text-hawkeye-gold">
                        {courseCount.totalCount}{" "}
                    </span>
                    Courses Found
                </p>
                <SearchBar />
                <Suspense fallback={<p>Loading Filters...</p>}>
                    <SearchFilters
                        allSubjects={allSubjects}
                        allSessions={allSessions}
                        allInstructors={allInstructors}
                    />
                </Suspense>
            </div>
            <Suspense fallback={<p>Querying Courses...</p>}>
                <CourseTable className="grow" courses={queriesCourses} />
            </Suspense>
        </div>
    );
}
