export function SubmitButton({
    pending,
    text = "Submit",
    textPending = "Submitting",
    className,
}: {
    pending: boolean;
    text?: string;
    textPending?: string;
    className?: string;
}) {
    return (
        <button
            className={`${className} w-fit rounded-full border-thin-1 border-hawkeye-gold px-flex-gap-small py-paragraph-gap-small transition-all duration-150 hover:border-off-white`}
            type="submit"
            disabled={pending}
        >
            {pending ? textPending : text}
        </button>
    );
}
