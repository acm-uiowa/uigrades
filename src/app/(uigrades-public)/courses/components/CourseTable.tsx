"use client";

import { use } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CourseCard } from "./CourseCard";
import { CourseType } from "@/db/types";
import { BorderContainerSmall } from "../../components/BorderContainerSmall";

export function CourseTable({
    courses,
    className,
}: {
    courses: Promise<CourseType[]>;
    className?: string;
}) {
    const loadedCourses = use(courses);

    const { push } = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname();

    const loadMoreCourses = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(
            "limit",
            (parseInt(searchParams.get("limit") ?? "20") + 20).toString(),
        );

        push(`${path}?${params.toString()}`, { scroll: false });
    };

    return (
        <div
            className={`${className} flex flex-col items-center gap-flex-gap-large`}
        >
            <ul className="flex w-full flex-col gap-flex-gap-small">
                {loadedCourses.map((course) => (
                    <li key={course.uniqueID}>
                        <CourseCard
                            showSimilar={true}
                            courseInformation={course}
                        />
                    </li>
                ))}
            </ul>
            {loadedCourses.length === 0 && (
                <p>{"Oops! No courses were found :("}</p>
            )}
            {parseInt(searchParams.get("limit") ?? "20") ===
                loadedCourses.length && (
                <button className="w-fit text-center" onClick={loadMoreCourses}>
                    <BorderContainerSmall className="text-light-gray transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                        View More Courses
                    </BorderContainerSmall>
                </button>
            )}
        </div>
    );
}
