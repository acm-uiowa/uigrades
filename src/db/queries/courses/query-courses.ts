import { getClient } from "@/db";
import { CourseType } from "@/db/types";

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

    const pipeline = [];

    if (filters.search) {
        const searchTerms = filters.search.toLowerCase().split(" ");
        const searchableFields = [
            "courseCode",
            "courseTitle",
            "instructors",
            "session",
            "subject",
        ];
        const regexConditions = searchTerms.map((term) => ({
            $or: searchableFields.map((field) => ({
                [field]: { $regex: term, $options: "i" },
            })),
        }));
        pipeline.push({
            $match: { $and: regexConditions },
        });
    }

    if (subjects.length > 0) {
        pipeline.push({
            $match: {
                subject: { $in: subjects },
            },
        });
    }

    if (sessions.length > 0) {
        pipeline.push({
            $match: {
                session: { $in: sessions },
            },
        });
    }

    if (instructors.length > 0) {
        pipeline.push({
            $match: {
                instructors: { $in: instructors },
            },
        });
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

        pipeline.push({
            $match: {
                $or: courseLevels,
            },
        });
    }

    if (filters.skip) {
        pipeline.push({
            $skip: parseInt(filters.skip),
        });
    } else {
        pipeline.push({
            $skip: 0,
        });
    }

    if (filters.limit) {
        pipeline.push({
            $limit: parseInt(filters.limit),
        });
    } else {
        pipeline.push({
            $limit: 20,
        });
    }

    pipeline.push({
        $project: {
            _id: 0,
        },
    });

    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const coursesCollection =
        coursesInformationDB.collection<CourseType>("courses");

    const courses = (await coursesCollection
        .aggregate(pipeline)
        .toArray()) as CourseType[];

    return courses;
}
