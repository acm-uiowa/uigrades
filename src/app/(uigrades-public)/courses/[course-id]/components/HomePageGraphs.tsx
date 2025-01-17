"use client";

import { useState, useEffect } from "react";
import { GraphCard } from "./GraphCard";
import exampleCourseData from "@/db/seeds/data/example-courses-data.json";

const data = exampleCourseData.exampleData;
const length = data.length;

export function HomePageGraphs({ className }: { className?: string }) {
    const [currentClass, setCurrentClass] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentClass((prev) => (prev + 1) % length);
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={`${className}`}>
            <GraphCard courseInformation={data[currentClass]} />
        </div>
    );
}
