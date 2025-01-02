"use client";

export function SubmitButton({
    pending,
    className,
}: {
    pending: boolean;
    className?: string;
}) {
    return (
        <button className={`${className}`} type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}
