import { ObjectId } from "mongodb";
import { getClient } from "@/db";

export default async function deleteAdminLogin(docID: string) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminLoginCollection = adminDB.collection("admin_login");

    await adminLoginCollection.deleteOne({
        _id: new ObjectId(docID),
    });
}
