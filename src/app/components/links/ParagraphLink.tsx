import Link from "next/link";

export function ParagraphLink({
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
            className={`${className} text-hawkeye-gold underline`}
        >
            {children}
        </Link>
    ) : (
        <a
            href={href}
            target={"_blank"}
            rel="noopener noreferrer"
            className={`${className} text-hawkeye-gold underline`}
        >
            {children}
        </a>
    );
}
