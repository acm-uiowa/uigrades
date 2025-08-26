"use server";

import xlsx from "node-xlsx";
import { parseRawData } from "@/db/seeds/seed-courses";
import { getClient } from "@/db";

async function safeInsertMany(collection: any, docs: any[]) {
    if (docs.length === 0) return;

    try {
        await collection.insertMany(docs, { ordered: false });
    } catch (error: any) {
        if (error.code === 11000) {
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
    const db = client.db("courses_information");

    await safeInsertMany(db.collection("courses"), courses);
    await safeInsertMany(db.collection("generic_courses"), genericCourses);
    await safeInsertMany(db.collection("subjects"), subjects);
    await safeInsertMany(db.collection("sessions"), sessions);
    await safeInsertMany(db.collection("instructors"), instructors);

    console.log("Upload finished successfully");
    return { success: true };
}
