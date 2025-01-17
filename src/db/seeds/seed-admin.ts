import { getClient } from "..";

export default async function seedAdmin() {
    try {
        const client = await getClient();
        const admin_db = client.db("uigrades_admin");
        const admin_login = admin_db.collection("admin_login");
        const admin_session = admin_db.collection("admin_session");

        await admin_login.createIndex(
            { expiresAt: 1 },
            { expireAfterSeconds: 0 },
        );
        await admin_session.createIndex(
            { expiresAt: 1 },
            { expireAfterSeconds: 0 },
        );
    } catch {
        throw new Error("Error seeding admin collections");
    }
}
