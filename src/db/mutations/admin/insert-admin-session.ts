import { getClient } from "@/db";

export default async function insertAdminSession(
    cookieSessionID: string,
    expiresAt: Date,
) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminSessionCollection = adminDB.collection("admin_session");

    await adminSessionCollection.insertOne({
        adminSession: cookieSessionID,
        expiresAt: expiresAt,
    });
}
