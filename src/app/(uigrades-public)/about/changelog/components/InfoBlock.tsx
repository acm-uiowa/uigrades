import React from "react";
import { TagBlock } from "./TagBlock";

export function InfoBlock({
    version,
    date,
    tags,
    changes,
    authors,
    detailedDescription,
}: {
    version: string;
    date: string;
    tags: string[];
    changes: string[];
    authors: string[];
    detailedDescription?: string | undefined;
}) {
    return (
        <div className="flex flex-col gap-paragraph-gap text-off-white">
            <div className="subheader-mobile flex flex-row gap-flex-gap-large md:subheader-web">
                <h2 className="text-hawkeye-gold">{version}</h2>
                <h2>{date}</h2>
            </div>
            <ul className="flex flex-row gap-flex-gap-small">
                {tags.map((tag, idx) => (
                    <li key={`${tag}_${idx}`}>
                        <TagBlock tag={tag} />
                    </li>
                ))}
            </ul>
            <ol className="list-inside list-disc">
                {changes.map((change, idx) => (
                    <li key={`${change}_${idx}`}>
                        <span className="-ml-1.5">{change}</span>
                    </li>
                ))}
            </ol>
            {detailedDescription && (
                <div className="content-small">{detailedDescription}</div>
            )}
            <span className="content-small text-light-gray">
                <span className="font-semibold">Authors: </span>
                {authors.join(", ")}
            </span>
        </div>
    );
}
