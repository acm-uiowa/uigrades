import Image from "next/image";
import { Organizer } from "../types";

export function OrganizerCard({
    organizer,
    className = "",
}: {
    organizer: Organizer;
    className?: string;
}) {
    return (
        <div className={`${className} flex flex-row gap-flex-gap-small`}>
            <Image
                className="size-28 flex-shrink-0 overflow-clip rounded-br-3xl rounded-tl-3xl object-cover md:size-[150px] md:rounded-br-[2rem] md:rounded-tl-[2rem]"
                src={organizer.imageInfo.path}
                alt={organizer.imageInfo.alt}
                height={250}
                width={250}
            />
            <div className="flex flex-col gap-paragraph-gap-small md:gap-paragraph-gap">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="subheader-mobile md:subheader-web">
                        {organizer.details.name}
                    </h2>
                    <div className="flex flex-row gap-flex-gap-small">
                        <a
                            href={organizer.externals.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Link"
                        >
                            <Image
                                className="size-[21px]"
                                src="/logos/In-White-21.png"
                                alt="LinkedIn Logo"
                                height={21}
                                width={21}
                            />
                        </a>

                        {organizer.externals.github ? (
                            <a
                                href={organizer.externals.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Link"
                            >
                                <Image
                                    className="size-[21px]"
                                    src="/logos/github-mark-white.png"
                                    alt="GitHub Logo"
                                    height={21}
                                    width={21}
                                />
                            </a>
                        ) : null}
                    </div>
                </div>

                <div className="content-tiny flex flex-col gap-paragraph-gap-small text-light-gray md:content-small">
                    <span>{organizer.details.association}</span>
                    <span>{organizer.details.role}</span>
                </div>
            </div>
        </div>
    );
}
