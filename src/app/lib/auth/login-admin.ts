"use server";

import { cookies } from "next/headers";
import auth from ".";
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

export default async function loginAdmin(
    email: string,
    docID: string,
    loginCode: string,
) {
    await auth.loginCode.verify(email, docID, loginCode);
    await auth.loginCode.consume(docID);

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
