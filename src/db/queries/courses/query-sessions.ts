import { getClient } from "@/db";
import { SingleNameType } from "@/db/types";

export default async function getAllSessions() {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const sessionsCollection =
        coursesInformationDB.collection<SingleNameType>("sessions");

    const all_instructors = await sessionsCollection
        .find({}, { projection: { _id: 0 } })
        .toArray();
    return all_instructors;
}
