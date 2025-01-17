"use client";

import { useState, useEffect } from "react";

const words = ["Code", "Title", "Instructor", "Subject", "Session"];
const wordsLength = words.length;

export function TypeWriterWord({
    typeSpeedMS,
    interval,
    className,
}: {
    typeSpeedMS: number;
    interval: number;
    className?: string;
}) {
    const [currentWord, setCurrentWord] = useState(0);
    const [currentWordSubstring, setCurrentWordSubstring] = useState("");
    const [isTabVisible, setIsTabVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabVisible(document.visibilityState === "visible");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    useEffect(() => {
        if (!isTabVisible) return;

        const wordInterval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % wordsLength);
        }, interval);

        return () => {
            clearInterval(wordInterval);
        };
    }, [interval, isTabVisible]);

    useEffect(() => {
        if (!isTabVisible) return;

        const fullWord = words[currentWord];
        let index = 0;

        const typeInterval = setInterval(() => {
            setCurrentWordSubstring(fullWord.slice(0, index + 1));
            index++;

            if (index === fullWord.length) {
                clearInterval(typeInterval);
            }
        }, typeSpeedMS);

        const deleteTimer = setTimeout(
            () => {
                const deleteInterval = setInterval(() => {
                    setCurrentWordSubstring(fullWord.slice(0, index - 1));
                    index--;

                    if (index === 0) {
                        clearInterval(deleteInterval);
                    }
                }, typeSpeedMS);
            },
            interval - typeSpeedMS * fullWord.length - 500,
        );

        return () => {
            clearTimeout(deleteTimer);
        };
    }, [currentWord, interval, typeSpeedMS, isTabVisible]);

    return (
        <span className={`${className} h-[36px] items-baseline`}>
            {currentWordSubstring}
            <span className="blinking-cursor ml-[1.5px] h-2/5 translate-y-1" />
        </span>
    );
}
