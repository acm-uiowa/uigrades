import { NavBar } from "./components/NavBar";
import auth from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const adminSession = await auth.session.getAndUpdateSession();
    if (!adminSession) {
        redirect("/admin/login");
    }

    return (
        <div className="flex flex-row">
            <NavBar className="w-1/5" />
            <div className="grow bg-off-white px-page-mobile-x py-page-mobile-y text-black md:py-page-web-y">
                {children}
            </div>
        </div>
    );
}
