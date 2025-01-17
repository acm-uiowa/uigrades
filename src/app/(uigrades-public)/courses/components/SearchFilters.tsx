"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { use, useState, useEffect } from "react";
import { BorderContainerSmall } from "@/app/(uigrades-public)/components/BorderContainerSmall";
import { FilterIcon } from "@/app/(uigrades-public)/components/icons/FilterIcon";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Filter } from "./Filter";
import { SingleNameType } from "@/db/types";
import { CloseIcon } from "../../components/icons/CloseIcon";
import { BorderContainerLarge } from "../../components/BorderContainerLarge";

interface FilterType {
    name: string;
    checked: boolean;
}

function singletonDocsToList(docsList: SingleNameType[]) {
    const list: string[] = [];
    for (const doc of docsList) {
        list.push(doc["name"]);
    }
    list.sort();

    return list;
}

function getFilters(filters: FilterType[]) {
    const stringList: string[] = [];
    for (const filter of filters) {
        if (filter.checked) {
            stringList.push(filter.name);
        }
    }

    return stringList;
}

const listToFilterList = (list: string[]) => {
    const filterList: FilterType[] = [];

    for (const item of list) {
        filterList.push({ name: item, checked: false });
    }
    return filterList;
};

export function SearchFilters({
    allSubjects,
    allSessions,
    allInstructors,
    courseLevels,
}: {
    allSubjects: Promise<SingleNameType[]>;
    allSessions: Promise<SingleNameType[]>;
    allInstructors: Promise<SingleNameType[]>;
    courseLevels: string[];
}) {
    const { push } = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const [courseFilters, setCourseFilters] = useState<{
        subject: FilterType[];
        session: FilterType[];
        instructor: FilterType[];
        courseLevel: FilterType[];
    }>({
        subject: listToFilterList(singletonDocsToList(use(allSubjects))),
        session: listToFilterList(singletonDocsToList(use(allSessions))),
        instructor: listToFilterList(singletonDocsToList(use(allInstructors))),
        courseLevel: listToFilterList(courseLevels),
    });

    useEffect(() => {
        const subjectsParam = getFilters(courseFilters.subject).join(",");
        const sessionsParam = getFilters(courseFilters.session).join(",");
        const instructorsParam = getFilters(courseFilters.instructor).join(",");
        const courseLevelsParams = getFilters(courseFilters.courseLevel).join(
            ",",
        );

        const params = new URLSearchParams(searchParams.toString());
        if (subjectsParam) {
            params.set("subject_filter", subjectsParam);
        } else {
            params.delete("subject_filter");
        }
        if (sessionsParam) {
            params.set("session_filter", sessionsParam);
        } else {
            params.delete("session_filter");
        }
        if (instructorsParam) {
            params.set("instructor_filter", instructorsParam);
        } else {
            params.delete("instructor_filter");
        }
        if (courseLevelsParams) {
            params.set("course_levels_filter", courseLevelsParams);
        } else {
            params.delete("course_levels_filter");
        }

        params.delete("limit");

        push(`${path}?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseFilters]);

    const handleMobileFilterOpenClose = () => {
        setMobileFilterOpen((prev) => !prev);
    };

    const clearFilters = () => {
        const updatedFilter = { ...courseFilters };
        Object.values(updatedFilter).forEach((filters) => {
            filters.forEach((val) => {
                val.checked = false;
            });
        });

        setCourseFilters(updatedFilter);
    };

    return (
        <div className="content-small flex flex-col gap-flex-gap-small text-light-gray md:content-normal md:gap-flex-gap-large">
            <div className="hidden flex-col gap-flex-gap-small md:flex">
                <Filter
                    name="subject"
                    courseFilters={courseFilters}
                    setCourseFilters={setCourseFilters}
                >
                    <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                        <FilterIcon className="size-4" />
                        <span>Subject</span>
                    </BorderContainerSmall>
                </Filter>
                <Filter
                    name="session"
                    courseFilters={courseFilters}
                    setCourseFilters={setCourseFilters}
                >
                    <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                        <FilterIcon className="size-4" />
                        <span>Session</span>
                    </BorderContainerSmall>
                </Filter>
                <Filter
                    name="instructor"
                    courseFilters={courseFilters}
                    setCourseFilters={setCourseFilters}
                >
                    <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                        <FilterIcon className="size-4" />
                        <span>Instructor</span>
                    </BorderContainerSmall>
                </Filter>
                <Filter
                    name="courseLevel"
                    courseFilters={courseFilters}
                    setCourseFilters={setCourseFilters}
                >
                    <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                        <FilterIcon className="size-4" />
                        <span>Course Level</span>
                    </BorderContainerSmall>
                </Filter>
            </div>
            <div className="flex flex-row items-center justify-center gap-flex-gap-small md:justify-start md:gap-0">
                <button onClick={handleMobileFilterOpenClose}>
                    <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap md:hidden">
                        <FilterIcon className="size-3.5" />
                        Filters
                    </BorderContainerSmall>
                </button>
                <button
                    className="w-fit text-light-gray"
                    onClick={clearFilters}
                >
                    <BorderContainerSmall className="flex flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                        <ArrowPathIcon className="size-3.5" />
                        <span>Clear Filters</span>
                    </BorderContainerSmall>
                </button>
                <div
                    className={`${mobileFilterOpen ? "z-10 opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-[60px] flex justify-center transition-opacity duration-150 ease-in-out`}
                >
                    <div
                        className="absolute size-full bg-black/75"
                        onClick={handleMobileFilterOpenClose}
                    />
                    <BorderContainerLarge className="z-10 mx-page-mobile-x mt-24 flex h-fit w-full flex-col gap-flex-gap-small bg-primary-dark-gray md:w-1/3">
                        <div className="flex flex-row items-center justify-between">
                            <h2 className="content-normal text-off-white">
                                Filters
                            </h2>
                            <button
                                tabIndex={mobileFilterOpen ? 0 : -1}
                                className="block"
                                onClick={handleMobileFilterOpenClose}
                            >
                                <CloseIcon className="size-3.5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-flex-gap-small">
                            <Filter
                                name="subject"
                                courseFilters={courseFilters}
                                setCourseFilters={setCourseFilters}
                            >
                                <BorderContainerSmall className="flex w-full flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                                    <FilterIcon className="size-3.5" />
                                    <span>Subject</span>
                                </BorderContainerSmall>
                            </Filter>
                            <Filter
                                name="session"
                                courseFilters={courseFilters}
                                setCourseFilters={setCourseFilters}
                            >
                                <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                                    <FilterIcon className="size-3.5" />
                                    <span>Session</span>
                                </BorderContainerSmall>
                            </Filter>
                            <Filter
                                name="instructor"
                                courseFilters={courseFilters}
                                setCourseFilters={setCourseFilters}
                            >
                                <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                                    <FilterIcon className="size-3.5" />
                                    <span>Instructor</span>
                                </BorderContainerSmall>
                            </Filter>
                            <Filter
                                name="courseLevel"
                                courseFilters={courseFilters}
                                setCourseFilters={setCourseFilters}
                            >
                                <BorderContainerSmall className="flex w-fit flex-row items-center gap-paragraph-gap transition-colors duration-150 hover:border-primary-hover-border-color hover:text-off-white">
                                    <FilterIcon className="size-4" />
                                    <span>Course Level</span>
                                </BorderContainerSmall>
                            </Filter>
                        </div>
                    </BorderContainerLarge>
                </div>
            </div>
        </div>
    );
}
