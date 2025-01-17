import { getClient } from "@/db";

export default async function findAdminSession(cookieSessionID: string) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminSessionCollection = adminDB.collection("admin_session");

    const session = await adminSessionCollection.findOne({
        adminSession: cookieSessionID,
    });

    return session;
}
