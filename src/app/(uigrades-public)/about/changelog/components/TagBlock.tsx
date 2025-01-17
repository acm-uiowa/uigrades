export function TagBlock({ tag }: { tag: string }) {
    let tagColor = undefined;

    if (tag === "Bug Fix") {
        tagColor = "#E03D4D";
    } else if (tag === "Improvement") {
        tagColor = "#2662D9";
    } else if (tag === "Update") {
        tagColor = "#2EB88A";
    } else if (tag === "Feature") {
        tagColor = "#7857DB";
    }

    return (
        tagColor && (
            <div
                style={{ backgroundColor: tagColor }}
                className="content-small rounded-md px-paragraph-gap py-paragraph-gap-small text-off-white"
            >
                {tag}
            </div>
        )
    );
}
