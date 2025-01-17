"use server";

import queries from "@/db/queries";

export default async function verifyLoginCode(
    email: string,
    docID: string,
    loginCode: string,
) {
    const doc = await queries.admin.adminLogin(docID);

    if (!doc) {
        throw new Error("Login code does not exist.");
    }

    if (loginCode !== doc[`adminCode:${email}`]) {
        throw new Error("Invalid Code");
    }

    if (Date.now() > doc[`adminCode:${email}:expires`]) {
        throw new Error("Login Code Expired");
    }
}
