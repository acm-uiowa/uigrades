"use client";

import { use } from "react";
import { CourseCard } from "../../components/CourseCard";
import { CourseType } from "@/db/types";

export function SimilarCourses({
    coursesPromise,
}: {
    coursesPromise: Promise<CourseType[]>;
}) {
    const similarCourses = use(coursesPromise);

    return (
        <div className="-mx-page-mobile-x md:mx-0">
            <ul
                style={{
                    scrollbarColor: "#666666 #333333",
                }}
                className="flex w-full snap-x overflow-x-auto pb-flex-gap-small md:gap-page-mobile-x"
            >
                {similarCourses.map((course) => (
                    <li
                        key={course.uniqueID}
                        className="snap-start pl-page-mobile-x md:pl-[1px]"
                    >
                        <CourseCard
                            courseInformation={course}
                            showSimilar={false}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
