import { getClient } from "@/db";
import { SingleNameType } from "@/db/types";

export default async function insertInstructors(instructors: SingleNameType[]) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const instructorsCollection =
        coursesInformationDB.collection<SingleNameType>("instructors");

    await instructorsCollection.insertMany(instructors);
}
