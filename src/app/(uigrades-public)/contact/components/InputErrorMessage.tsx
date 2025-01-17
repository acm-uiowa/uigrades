export function InputErrorMessage({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <p className={`${className} content-tiny text-[#E03D4D]`}>{children}</p>
    );
}
