import { getClient } from "@/db";
import { SingleNameType } from "@/db/types";

export default async function insertSubjects(subjects: SingleNameType[]) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const subjectsCollection =
        coursesInformationDB.collection<SingleNameType>("subjects");

    await subjectsCollection.insertMany(subjects);
}
