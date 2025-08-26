"use server";

import xlsx from "node-xlsx";
import { parseRawData } from "@/db/seeds/seed-courses";
import { getClient } from "@/db";
import { Db, Collection, Document, MongoServerError } from "mongodb";

async function safeInsertMany<T extends Document>(
    collection: Collection<T>,
    docs: T[],
) {
    if (docs.length === 0) return;

    try {
        await collection.insertMany(
            docs as import("mongodb").OptionalUnlessRequiredId<T>[],
            { ordered: false },
        );
    } catch (error: unknown) {
        if (error instanceof MongoServerError && error.code === 11000) {
            console.log(
                `Duplicate key error in collection ${collection.collectionName}, skipped duplicates`,
            );
        } else {
            throw error;
        }
    }
}

export async function uploadXlsx(formData: FormData) {
    console.log("Uploading XLSX...");

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const workSheets = xlsx.parse(buffer);

    const { courses, genericCourses, subjects, sessions, instructors } =
        await parseRawData(workSheets);

    const client = await getClient();
    const db: Db = client.db("courses_information");

    await safeInsertMany(db.collection("courses"), courses);
    await safeInsertMany(db.collection("generic_courses"), genericCourses);
    await safeInsertMany(db.collection("subjects"), subjects);
    await safeInsertMany(db.collection("sessions"), sessions);
    await safeInsertMany(db.collection("instructors"), instructors);

    console.log("Upload finished successfully");
    return { success: true };
}
