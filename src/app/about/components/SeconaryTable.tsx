import { SecondaryCard } from "./SecondaryCard";
import { Secondary } from "../types";

export function SecondaryTable({
    secondaries,
    className,
}: {
    secondaries: Secondary[];
    className?: string;
}) {
    return (
        <ul
            className={`${className} flex flex-row flex-wrap gap-flex-gap-small`}
        >
            {secondaries.map((secondaries) => (
                <li key={secondaries.name}>
                    <SecondaryCard secondary={secondaries} />
                </li>
            ))}
        </ul>
    );
}
