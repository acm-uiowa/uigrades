"use client";

import { useState, useEffect, useRef, SetStateAction } from "react";
import Form from "next/form";
import { BorderContainerLarge } from "@/app/(uigrades-public)/components/BorderContainerLarge";
import { CloseIcon } from "@/app/(uigrades-public)/components/icons/CloseIcon";
import { FilterSearchBar } from "./FilterSearchBar";

export function Filter({
    name,
    courseFilters,
    setCourseFilters,
    className,
    children,
}: {
    name: "subject" | "session" | "instructor" | "courseLevel";
    courseFilters: {
        subject: { name: string; checked: boolean }[];
        session: { name: string; checked: boolean }[];
        instructor: { name: string; checked: boolean }[];
        courseLevel: { name: string; checked: boolean }[];
    };
    setCourseFilters: React.Dispatch<
        SetStateAction<{
            subject: { name: string; checked: boolean }[];
            session: { name: string; checked: boolean }[];
            instructor: { name: string; checked: boolean }[];
            courseLevel: { name: string; checked: boolean }[];
        }>
    >;
    className?: string;
    children: React.ReactNode;
}) {
    const [options, setOptions] = useState(courseFilters[name]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");

    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && filterOpen) {
                handleFilterExit();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    useEffect(() => {
        const filteredFilterOptions = courseFilters[name].filter((item) =>
            item.name.toLowerCase().includes(filterSearch.toLowerCase()),
        );

        setOptions(filteredFilterOptions);
    }, [name, courseFilters, filterSearch]);

    const toggleFilterOpen = () => {
        setFilterOpen((prev) => !prev);
    };

    const handleFilterApply = (filterData: FormData) => {
        const data = Object.fromEntries(filterData);
        const updatedFilter = { ...courseFilters };

        updatedFilter[name].forEach((filterOption) => {
            if (data[filterOption.name] === "on") {
                filterOption.checked = true;
            } else {
                filterOption.checked = false;
            }
        });

        setCourseFilters(updatedFilter);
        toggleFilterOpen();
    };

    const handleFilterExit = () => {
        formRef.current?.reset();
        toggleFilterOpen();
    };

    return (
        <div className={`${className}`}>
            <button onClick={toggleFilterOpen}>{children}</button>
            <div
                className={`${filterOpen ? "z-10 opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-0 flex justify-center transition-opacity duration-150 ease-in-out`}
            >
                <div
                    className="absolute size-full bg-black/75"
                    onClick={handleFilterExit}
                />
                <BorderContainerLarge className="z-10 mx-page-mobile-x mt-24 flex h-fit w-full flex-col gap-flex-gap-small bg-primary-dark-gray md:w-1/3">
                    <div className="flex w-full flex-row items-center border-b-thin-1 border-primary-border-color pb-paragraph-gap">
                        <FilterSearchBar
                            name={name}
                            filterOpen={filterOpen}
                            setFilterSearch={setFilterSearch}
                        />
                        <div>
                            <button
                                className="hidden rounded-md border-thin-1 border-primary-border-color px-1 text-content-tiny text-off-white md:block"
                                onClick={handleFilterExit}
                                tabIndex={filterOpen ? 0 : -1}
                            >
                                Esc
                            </button>
                            <button
                                tabIndex={filterOpen ? 0 : -1}
                                className="block md:hidden"
                                onClick={handleFilterExit}
                            >
                                <CloseIcon className="size-3.5" />
                            </button>
                        </div>
                    </div>
                    <Form
                        action={handleFilterApply}
                        ref={formRef}
                        className="flex flex-col"
                    >
                        <div
                            style={{
                                scrollbarColor: "#666666 #333333",
                            }}
                            className="max-h-80 overflow-y-auto pr-flex-gap-small"
                        >
                            <ul className="flex h-full flex-col text-off-white">
                                {options.map((option) => (
                                    <li
                                        key={option.name}
                                        className="rounded-md hover:bg-secondary-medium-gray"
                                    >
                                        <label className="flex flex-row gap-flex-gap-small px-paragraph-gap-small py-paragraph-gap">
                                            <input
                                                style={{
                                                    accentColor: "#FFCD00",
                                                }}
                                                tabIndex={-1}
                                                type="checkbox"
                                                name={option.name}
                                                defaultChecked={option.checked}
                                            />
                                            {option.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="submit"
                            tabIndex={filterOpen ? 0 : -1}
                            className="w-full pt-paragraph-gap"
                        >
                            Apply
                        </button>
                    </Form>
                </BorderContainerLarge>
            </div>
        </div>
    );
}
