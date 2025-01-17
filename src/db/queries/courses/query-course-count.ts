import { getClient } from "@/db";
import { CourseType } from "@/db/types";
import { Filter } from "mongodb";

export default async function findCourses(filters: {
    search?: string;
    subject_filter?: string;
    session_filter?: string;
    instructor_filter?: string;
    course_levels_filter?: string;
    skip?: string;
    limit?: string;
}) {
    const subjects = filters.subject_filter?.split(",") ?? [];
    const sessions = filters.session_filter?.split(",") ?? [];
    const instructors = filters.instructor_filter?.split(",") ?? [];
    const rawCourseLevels = filters.course_levels_filter?.split(",") ?? [];

    const query: Filter<CourseType> = {};

    if (filters.search) {
        const terms = filters.search.split(" ").map((term) => term.trim());
        query.$and = terms.map((term) => ({
            $or: [
                { subject: { $regex: term, $options: "i" } },
                { courseCode: { $regex: term, $options: "i" } },
                { courseTitle: { $regex: term, $options: "i" } },
                { instructors: { $regex: term, $options: "i" } },
                { session: { $regex: term, $options: "i" } },
            ],
        }));
    }

    if (subjects.length > 0) {
        query.subject = { $in: subjects };
    }

    if (sessions.length > 0) {
        query.session = { $in: sessions };
    }

    if (instructors.length > 0) {
        query.instructors = { $in: instructors };
    }

    if (rawCourseLevels.length > 0) {
        const courseLevels = rawCourseLevels.map((level) => {
            const split = level.split(" ");
            const range = split[split.length - 1];
            const [min, max] = range
                .split("-")
                .map((value) => parseInt(value, 10));
            return {
                courseLevel: { $gte: min, $lte: max },
            };
        });

        query.$or = courseLevels;
    }

    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const coursesCollection =
        coursesInformationDB.collection<CourseType>("courses");

    const totalCount = await coursesCollection.countDocuments(query);

    return { totalCount };
}
