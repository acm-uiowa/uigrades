"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, SetStateAction } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BorderContainerSmall } from "../../components/BorderContainerSmall";
import { CloseIcon } from "../../components/icons/CloseIcon";

export function SearchBar() {
    const { push } = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(
        searchParams.get("search") ?? "",
    );

    useEffect(() => {
        const pushSearchQuery = (searchValue: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchValue) {
                params.set("search", searchValue);
            } else {
                params.delete("search");
            }

            params.delete("limit");

            push(`${path}?${params.toString()}`);
        };

        const timeout = setTimeout(() => {
            pushSearchQuery(searchValue);
        }, 250);

        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const handleSearchChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setSearchValue(event.target.value);
    };

    const clearSearchValues = () => {
        setSearchValue("");
    };
    return (
        <BorderContainerSmall className="flex flex-row items-center justify-between gap-paragraph-gap transition-colors duration-150">
            <MagnifyingGlassIcon className="size-4 flex-shrink-0 text-light-gray md:size-5" />
            <input
                className="w-full text-off-white placeholder-primary-medium-gray"
                placeholder="E.g. CHEM:1110 Fall 2023"
                value={searchValue}
                onChange={handleSearchChange}
            />
            {searchValue && (
                <button onClick={clearSearchValues}>
                    <CloseIcon className="size-3.5" />
                </button>
            )}
        </BorderContainerSmall>
    );
}
