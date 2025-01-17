import { getClient } from "@/db";
import { CourseType } from "@/db/types";

export default async function insertCourses(courses: CourseType[]) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const coursesCollection = coursesInformationDB.collection("courses");
    await coursesCollection.createIndex(
        {
            courseCode: "text",
            courseTitle: "text",
            instructors: "text",
            session: "text",
            subject: "text",
        },
        {
            name: "CourseTextIndex",
            weights: {
                courseCode: 10,
                courseTitle: 10,
                instructors: 2,
                session: 2,
                subject: 2,
            },
        },
    );

    await coursesCollection.insertMany(courses);
}
