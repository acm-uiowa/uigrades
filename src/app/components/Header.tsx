export function Header({
    className = "",
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <h1
            className={`${className} md:header-1-web" header-1-mobile mb-header-page-gap`}
        >
            {children}
        </h1>
    );
}
