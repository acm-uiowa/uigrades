export function BorderContainerSmall({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${className} overflow-clip rounded-lg border-thin-1 border-primary-border-color px-flex-gap-small py-paragraph-gap-small`}
        >
            {children}
        </div>
    );
}
