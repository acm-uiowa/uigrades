import { getClient } from "@/db";
import { CourseType } from "@/db/types";

export default async function findIndividualCourse(courseUniqueID: string) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const coursesCollection =
        coursesInformationDB.collection<CourseType>("courses");

    const course = await coursesCollection.findOne(
        {
            uniqueID: courseUniqueID,
        },
        { projection: { _id: 0 } },
    );
    return course;
}
