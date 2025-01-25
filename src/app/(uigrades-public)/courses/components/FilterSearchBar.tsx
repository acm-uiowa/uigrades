"use client";

import { useState, useEffect, SetStateAction } from "react";

export function FilterSearchBar({
    filterOpen,
    setFilterSearch,
}: {
    filterOpen: boolean;
    setFilterSearch: React.Dispatch<SetStateAction<string>>;
}) {
    const [search, setSearch] = useState("");

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

    return (
        <input
            tabIndex={filterOpen ? 0 : -1}
            className="grow text-off-white placeholder-primary-medium-gray"
            placeholder="E.g. CHEM"
            value={search}
            onChange={handleFilterSearchChange}
        />
    );
}
