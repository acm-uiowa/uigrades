"use server";

import mutations from "@/db/mutations";

export default async function consumeLoginCode(docID: string) {
    await mutations.admin.deleteAdminLogin(docID);
}
