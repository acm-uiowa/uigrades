import { getClient } from "@/db";
import { SingleNameType } from "@/db/types";

export default async function getAllInstructors() {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const instructorsCollection =
        coursesInformationDB.collection<SingleNameType>("instructors");

    const all_instructors = await instructorsCollection
        .find({}, { projection: { _id: 0 } })
        .toArray();

    return all_instructors;
}
