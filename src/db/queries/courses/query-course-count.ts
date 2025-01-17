import { getClient } from "@/db";
import { CourseType } from "@/db/types";

export default async function findCourses(filters: {
    search?: string;
    subject_filter?: string;
    session_filter?: string;
    instructor_filter?: string;
    skip?: string;
    limit?: string;
}) {
    const subjects = filters.subject_filter?.split(",") ?? [];
    const sessions = filters.session_filter?.split(",") ?? [];
    const instructors = filters.instructor_filter?.split(",") ?? [];

    const query = {};

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

    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const coursesCollection =
        coursesInformationDB.collection<CourseType>("courses");

    const totalCount = await coursesCollection.countDocuments(query);

    return { totalCount };
}
