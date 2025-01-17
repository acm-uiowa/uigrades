import { getClient } from "@/db";

export default async function updateAdminSession(
    cookieSessionID: string,
    expiresAt: Date,
) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminSessionCollection = adminDB.collection("admin_session");

    await adminSessionCollection.updateOne(
        { adminSession: cookieSessionID },
        { $set: { expiresAt: expiresAt } },
    );
}
