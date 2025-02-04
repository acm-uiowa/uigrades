"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";

type Direction = "Top" | "Right" | "Bottom" | "Left";

export function StartBrowsingButton({
    className = "",
}: {
    className?: string;
}) {
    const [hovered, setHovered] = useState(false);
    const [direction, setDirection] = useState<Direction>("Top");

    const rotateDirection = (prev: Direction) => {
        const directions: Direction[] = ["Top", "Right", "Bottom", "Left"];
        const currIdx = directions.indexOf(prev);
        const nextDirection = (currIdx + 1) % directions.length;
        return directions[nextDirection];
    };

    const handleHover = () => {
        setHovered((prev) => !prev);
    };

    const movingMap: Record<Direction, string> = {
        Top: "radial-gradient(40% 50% at 50% 0%, rgba(255, 205, 0, 1) 0%, rgba(255, 205, 0, 0) 100%)",
        Right: "radial-gradient(60% 100% at 100% 50%, rgba(255, 205, 0, 1) 0%, rgba(255, 205, 0, 0) 100%)",
        Bottom: "radial-gradient(40% 50% at 50% 100%, rgba(255, 205, 0, 1) 0%, rgba(255, 205, 0, 0) 100%)",
        Left: "radial-gradient(60% 100% at 0% 50%, rgba(255, 205, 0, 1) 0%, rgba(255, 205, 0, 0) 100%)",
    };

    const highlight =
        "radial-gradient(rgba(255, 205, 0, 1) 0%, rgba(255, 205, 0, 1) 100%)";

    useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                setDirection((prev) => rotateDirection(prev));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hovered]);

    return (
        <Link
            href="/courses"
            className={`${className} rounded-full`}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <button className="relative overflow-hidden rounded-full bg-white p-[1.25px]">
                <div className="content-normal relative z-10 rounded-full px-8 py-paragraph-gap">
                    Start Browsing
                </div>
                <motion.div
                    className="absolute inset-0 z-0 overflow-hidden rounded-full"
                    initial={{ background: movingMap[direction] }}
                    animate={{ background: movingMap[direction] }}
                    transition={{ ease: "linear", duration: 1 }}
                />
                <motion.div
                    className="z-1 absolute inset-0 rotate-180 overflow-hidden rounded-full"
                    initial={{ background: movingMap[direction] }}
                    animate={{
                        background: hovered
                            ? [movingMap[direction], highlight]
                            : movingMap[direction],
                    }}
                    transition={{ ease: "linear", duration: 1 }}
                />
                <div className="absolute inset-[2px] z-[2] rounded-full bg-primary-dark-gray" />
            </button>
        </Link>
    );
}
