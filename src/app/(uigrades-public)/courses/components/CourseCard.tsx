import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";
import { CourseType } from "@/db/types";
import { BorderContainerLarge } from "../../components/BorderContainerLarge";

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

export function CourseCard({
    courseInformation,
    showSimilar = true,
    className,
}: {
    courseInformation: CourseType;
    showSimilar?: boolean;
    className?: string;
}) {
    const gradesList = Object.values(courseInformation.grades);

    const students = gradesList.reduce((sum, count) => sum + count, 0);

    const medianGrade = getMedianGrade(
        students,
        gradesList,
        Object.keys(courseInformation.grades),
    );

    return (
        <Link href={`/courses/${courseInformation.uniqueID}`}>
            <BorderContainerLarge
                className={`${className} ${!showSimilar ? "w-80" : ""} flex flex-row justify-between gap-flex-gap-small rounded-2xl border-thin-1 border-primary-border-color bg-secondary-dark-gray px-page-mobile-x py-header-page-gap text-off-white transition-colors duration-150 hover:border-primary-hover-border-color hover:bg-secondary-medium-gray`}
            >
                <div className="flex max-w-[75%] shrink flex-col overflow-hidden">
                    <h2 className="subheader-mobile text-hawkeye-gold md:subheader-web">
                        {courseInformation.courseCode}
                    </h2>
                    <h3 className={`${!showSimilar ? "truncate" : ""}`}>
                        {courseInformation.courseTitle}
                    </h3>
                    <span className="truncate text-light-gray">
                        {courseInformation.instructors.join(", ")}
                    </span>
                    <span className="text-light-gray">
                        {courseInformation.session.split("-").join(" ")}
                    </span>
                </div>
                <div className="flex shrink-0 flex-row-reverse justify-between lg:w-1/3">
                    <div className="flex flex-row items-center gap-paragraph-gap">
                        <UsersIcon className="size-4 flex-shrink-0 text-hawkeye-gold md:size-5" />
                        <span>{students}</span>
                    </div>
                    {showSimilar && medianGrade && (
                        <div className="hidden flex-row items-center gap-paragraph-gap lg:flex">
                            <span> Median:</span>
                            <span className="text-hawkeye-gold">
                                {medianGrade}
                            </span>
                        </div>
                    )}
                </div>
            </BorderContainerLarge>
        </Link>
    );
}
