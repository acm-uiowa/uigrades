export function BorderContainerLarge({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${className} overflow-clip rounded-2xl border-thin-1 border-primary-border-color px-flex-gap-large py-flex-gap-small`}
        >
            {children}
        </div>
    );
}
