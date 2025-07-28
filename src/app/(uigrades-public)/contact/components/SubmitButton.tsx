export function SubmitButton({
    pending,
    className,
}: {
    pending: boolean;
    className?: string;
}) {
    return (
        <button
            className={`${className} w-fit cursor-not-allowed rounded-full border-thin-1 border-hawkeye-gold px-flex-gap-large py-paragraph-gap transition-all duration-150 hover:border-off-white`}
            type="submit"
            disabled={true /*pending*/}
        >
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}
