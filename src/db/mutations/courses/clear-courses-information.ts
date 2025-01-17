import { getClient } from "@/db";

export default async function clearCourses() {
    const client = await getClient();
    const coursesInformationDB = client.db("courses_information");
    const collections = await coursesInformationDB.listCollections().toArray();

    for (const collection of collections) {
        try {
            await coursesInformationDB
                .collection(collection.name)
                .deleteMany({});
            console.log(
                `Cleared documents from collection: ${collection.name}`,
            );
        } catch (error) {
            console.log(
                `Error clearing collection from collection: ${collection.name}`,
                error,
            );
        }
    }
    console.log("Document cleaning process complete");
}
