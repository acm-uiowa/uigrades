"use server";

import { cookies } from "next/headers";
import mutations from "@/db/mutations";

function generateSessionID() {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);

    const hexString = Array.from(randomBytes)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

    return hexString;
}

async function createAdminSession() {
    const sessionID = generateSessionID();
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

    try {
        await mutations.admin.insertAdminSession(sessionID, expiresAt);
    } catch {
        throw new Error("login session was not created successfully");
    }

    return { sessionID: sessionID, expiresAt: expiresAt };
}

export default async function loginAdmin(inputPassword: string) {
    const password = process.env.ADMIN_PASSWORD ?? "";
    if (inputPassword !== password) {
        throw new Error("Invalid password, please try again.");
    }

    const { sessionID, expiresAt } = await createAdminSession();
    const cookiesStore = await cookies();

    cookiesStore.set("session", sessionID, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/admin",
    });
}
