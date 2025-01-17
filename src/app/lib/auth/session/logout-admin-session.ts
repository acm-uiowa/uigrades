"use server";

import { cookies } from "next/headers";
import mutations from "@/db/mutations";

export default async function logoutAdmin() {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("session");

    if (!sessionCookie) {
        return undefined;
    }
    try {
        const sessionID = sessionCookie.value;
        await mutations.admin.deleteAdminSession(sessionID);

        cookiesStore.delete("session");
    } catch {
        throw new Error("Unexpected Database Connection Error");
    }
}
