import Link from "next/link";

export function NavBarLink({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`${className} rounded-lg px-flex-gap-small py-paragraph-gap hover:bg-primary-medium-gray`}
        >
            <span>{children}</span>
        </Link>
    );
}
