export function BorderContainerSmall({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="overflow-clip rounded-lg border-thin-1 border-primary-border-color px-flex-gap-small py-paragraph-gap-small">
            {children}
        </div>
    );
}
