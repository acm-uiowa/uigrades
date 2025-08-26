"use client";

import { logout } from "@/app/lib/auth/session";

export function LogoutButton() {
    return (
        <button
            onClick={async () => {
                await logout();
                window.location.href = "/admin/auth";
            }}
            className="mb-12 mt-auto rounded-lg bg-off-white py-2 text-hawkeye-black transition-all duration-75 hover:scale-105 hover:bg-white/95 active:scale-95"
        >
            Logout
        </button>
    );
}
