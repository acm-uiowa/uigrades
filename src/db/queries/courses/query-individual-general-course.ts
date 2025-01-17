import { getClient } from "@/db";
import { GenericCourseType } from "@/db/types";

export default async function findGenericCourse(genericCourseID: string) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const coursesCollection =
        coursesInformationDB.collection<GenericCourseType>("generic_courses");

    const course = await coursesCollection.findOne(
        {
            uniqueID: genericCourseID,
        },
        { projection: { _id: 0 } },
    );
    return course;
}
