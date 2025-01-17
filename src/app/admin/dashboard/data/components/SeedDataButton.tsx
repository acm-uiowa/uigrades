"use client";

import { seedDBs } from "@/db/seeds/seed";

export function SeedDataButton() {
    const handleClick = async () => {
        const result = await seedDBs();
        if (result.state === "error") {
            console.log(result.error);
        } else {
            console.log("success");
        }
    };
    return <button onClick={handleClick}>Seed Courses</button>;
}
