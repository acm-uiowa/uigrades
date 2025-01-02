import Image from "next/image";
import { Secondary } from "../types";

export function SecondaryCard({
    secondary,
    className,
}: {
    secondary: Secondary;
    className?: string;
}) {
    return (
        <div
            className={`${className} relative size-20 overflow-clip rounded-2xl`}
        >
            <a
                href={secondary.external}
                target={"_blank"}
                rel="noopener noreferrer"
            >
                <Image
                    className=""
                    src={secondary.imageInfo.path}
                    alt={secondary.imageInfo.alt}
                    height={250}
                    width={250}
                />
            </a>
        </div>
    );
}
