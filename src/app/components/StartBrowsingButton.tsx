import Link from "next/link";

export function StartBrowsingButton({
    className = "",
}: {
    className?: string;
}) {
    return (
        <Link href="/courses" className={`${className} rounded-full`}>
            <button className="rounded-full bg-action-border p-[1.25px]">
                <div className="content-normal rounded-full bg-primary-dark-gray px-8 py-2.5">
                    Start Browsing
                </div>
            </button>
        </Link>
    );
}
