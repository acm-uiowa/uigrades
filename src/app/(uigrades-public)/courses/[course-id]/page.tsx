"use server";

import { Suspense } from "react";
import { PageTitle } from "./components/PageTitle";
import { GraphCard } from "./components/GraphCard";
import { SimilarCourses } from "./components/SimilarCourses";
import queries from "@/db/queries";

export default async function CoursePage({
    params,
}: {
    params: Promise<{ "course-id": string }>;
}) {
    const courseUniqueID = decodeURIComponent((await params)["course-id"]);
    const genericCourseID = courseUniqueID.replace(/:\w{4}_/, "_");

    const uniqueCourse =
        await queries.courses.findIndividualCourse(courseUniqueID);
    const genericCourse =
        await queries.courses.findGenericCourse(genericCourseID);

    const similarCourses = genericCourse
        ? queries.courses.courses({ search: genericCourseID.split("_")[0] })
        : null;

    return uniqueCourse ? (
        <div className="flex flex-col gap-flex-gap-small md:gap-flex-gap-large">
            <Suspense>
                <PageTitle uniqueCourse={uniqueCourse} />
            </Suspense>
            <div className="max-w-1/2 flex flex-col justify-between gap-flex-gap-small md:flex-row md:gap-flex-gap-large">
                <GraphCard unique={true} courseInformation={uniqueCourse} />
                {genericCourse && (
                    <GraphCard
                        unique={false}
                        courseInformation={genericCourse}
                    />
                )}
            </div>
            {similarCourses && (
                <div className="-mx-page-mobile-x flex flex-col gap-flex-gap-small border-t-thin-1 border-primary-border-color px-page-mobile-x pt-page-mobile-y md:-mx-page-web-x md:px-page-web-x md:pt-page-web-y">
                    <span className="subheader-web text-hawkeye-gold">
                        Similar Courses
                    </span>
                    <SimilarCourses coursesPromise={similarCourses} />
                </div>
            )}
        </div>
    ) : (
        <div>Oops! We could not find the course you are looking for.</div>
    );
}
