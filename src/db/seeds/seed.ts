"use server";

import seeds from ".";
import mutations from "../mutations";

export async function seedDBs() {
    try {
        await mutations.courses.clearCoursesInformationDB();
        await seeds.seedAdminIndexes();
        await seeds.seedCoursesInformation();
        return { state: "success" };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { state: "error", error: error.message };
        } else {
            return { state: "error", error: "Error seeding databases" };
        }
    }
}

await seedDBs();
