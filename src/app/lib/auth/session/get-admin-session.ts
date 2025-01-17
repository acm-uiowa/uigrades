"use server";

import { cookies } from "next/headers";
import queries from "@/db/queries";

export default async function getAndUpdateAdminSession() {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("session");

    if (!sessionCookie) {
        return undefined;
    }

    try {
        return await queries.admin.adminSession(sessionCookie.value);
    } catch {
        return undefined;
    }
}
