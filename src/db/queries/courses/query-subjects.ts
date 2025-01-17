import { getClient } from "@/db";
import { SingleNameType } from "@/db/types";

export default async function getAllSubjects() {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const subjectsCollection =
        coursesInformationDB.collection<SingleNameType>("subjects");

    const all_instructors = await subjectsCollection
        .find({}, { projection: { _id: 0 } })
        .toArray();
    return all_instructors;
}
