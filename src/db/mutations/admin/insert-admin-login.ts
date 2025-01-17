import { getClient } from "@/db";

export default async function insertAdminLogin(
    email: string,
    otp: string,
    passwordExpirationSeconds: number,
    passwordDeletionSeconds: number,
) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminLoginCollection = adminDB.collection("admin_login");

    const insertedDoc = await adminLoginCollection.insertOne({
        [`adminCode:${email}`]: otp,
        [`adminCode:${email}:expires`]: new Date(
            Date.now() + passwordExpirationSeconds * 1000,
        ),
        expiresAt: new Date(Date.now() + passwordDeletionSeconds * 1000),
    });

    return { loginCode: otp, docID: insertedDoc.insertedId };
}
