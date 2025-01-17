export function Header({
    className = "",
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <h1
            className={`${className} header-1-mobile mb-header-page-gap md:header-1-web`}
        >
            {children}
        </h1>
    );
}
