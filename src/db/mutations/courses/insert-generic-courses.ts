import { GenericCourseType } from "@/db/types";
import { getClient } from "@/db";

export default async function insertGenericCourses(
    genericCourses: GenericCourseType[],
) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const genericCoursesCollection =
        coursesInformationDB.collection<GenericCourseType>("generic_courses");

    await genericCoursesCollection.insertMany(genericCourses);
}
