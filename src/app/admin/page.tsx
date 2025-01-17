"use server";

import auth from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const adminSession = await auth.session.getAndUpdateSession();
    if (!adminSession) {
        redirect("/admin/login");
    }
    redirect("/admin/dashboard");
}
