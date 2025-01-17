import { ObjectId } from "mongodb";
import { getClient } from "@/db";

export default async function findAdminLogin(docID: string) {
    const client = await getClient();
    const adminDB = client.db("uigrades_admin");
    const adminLoginCollection = adminDB.collection("admin_login");
    const doc = await adminLoginCollection.findOne({
        _id: new ObjectId(docID),
    });

    return doc;
}
