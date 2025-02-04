"use client";

import { useState, useEffect, SetStateAction } from "react";

export function FilterSearchBar({
    name,
    filterOpen,
    setFilterSearch,
}: {
    name: string;
    filterOpen: boolean;
    setFilterSearch: React.Dispatch<SetStateAction<string>>;
}) {
    const [search, setSearch] = useState("");

    // not working as intended
    useEffect(() => {
        setSearch("");
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilterSearch(search);
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handleFilterSearchChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setSearch(event.target.value);
    };

    let placeholder = "";

    if (name === "subject") {
        placeholder = "E.g. CHEM";
    } else if (name === "session") {
        placeholder = "E.g. Fall 2024";
    } else if (name === "instructor") {
        placeholder = "E.g. John Lewis";
    } else if (name === "courseLevel") {
        placeholder = "E.g. Undergraduate";
    } else {
        placeholder = "Search";
    }

    return (
        <input
            tabIndex={filterOpen ? 0 : -1}
            className="grow text-off-white placeholder-primary-medium-gray"
            placeholder={placeholder}
            value={search}
            onChange={handleFilterSearchChange}
        />
    );
}
