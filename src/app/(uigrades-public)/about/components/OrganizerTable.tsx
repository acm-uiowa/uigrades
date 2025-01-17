import { OrganizerCard } from "./OrganizerCard";
import { Organizer } from "../types";

export function OrganizerTable({
    organizers,
    className = "",
}: {
    organizers: Organizer[];
    className?: string;
}) {
    return (
        <ul className={`${className} flex flex-col gap-flex-gap-small`}>
            {organizers.map((organizer) => (
                <li key={organizer.details.name}>
                    <OrganizerCard organizer={organizer} />
                </li>
            ))}
        </ul>
    );
}
