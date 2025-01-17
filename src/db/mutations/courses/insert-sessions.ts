import { getClient } from "@/db";
import { SingleNameType } from "@/db/types";

export default async function insertSessions(sessions: SingleNameType[]) {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const sessionsCollection =
        coursesInformationDB.collection<SingleNameType>("sessions");

    await sessionsCollection.insertMany(sessions);
}
