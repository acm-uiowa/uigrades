export function ActiveFilters({
    singleFilter,
}: {
    singleFilter: { name: string; checked: boolean }[];
}) {
    return (
        <ul className="flex flex-row gap-3">
            {singleFilter
                .filter((item) => item.checked == true)
                .map((item) => (
                    <li key={item.name}>{item.name}</li>
                ))}
        </ul>
    );
}
