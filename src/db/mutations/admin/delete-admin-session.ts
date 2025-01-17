import { getClient } from "@/db";

export default async function deleteAdminSession(cookieSessionID: string) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminSessionCollection = adminDB.collection("admin_session");

    await adminSessionCollection.deleteOne({
        adminSession: cookieSessionID,
    });
}
