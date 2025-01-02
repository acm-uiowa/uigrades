import Link from "next/link";

export function HoverLink({
    href,
    internal = true,
    className = "",
    children,
}: {
    href: string;
    internal?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    return internal ? (
        <Link
            href={href}
            className={`${className} text-light-gray hover:text-off-white`}
        >
            {children}
        </Link>
    ) : (
        <a
            href={href}
            target={"_blank"}
            rel="noopener noreferrer"
            className={`${className} text-light-gray hover:text-off-white`}
        >
            {children}
        </a>
    );
}
