import { CourseType } from "@/db/types";

export function PageTitle({ uniqueCourse }: { uniqueCourse: CourseType }) {
    return (
        <div>
            <h1 className="header-1-mobile text-hawkeye-gold md:header-1-web">
                {uniqueCourse.courseCode}
            </h1>
            <div className="subheader-mobile text-off-white md:subheader-web">
                <h2>{uniqueCourse.courseTitle}</h2>
                <h2>{uniqueCourse.session.split("-").join(" ")}</h2>
            </div>
        </div>
    );
}
